const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/user');
const Post = require('./models/Post');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const uploadMiddleware = multer({ dest: 'uploads/' });
const salt = bcrypt.genSaltSync(10);

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
const secret = 'sadasdasd32312edsdfsafsfsdfsd';

// Static dosyaları sunma
app.use('/uploads', express.static(__dirname + '/uploads'));

  
  app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const userDoc = await User.findOne({ username });
      
      if (!userDoc) {
        return res.status(400).json('Wrong credentials');
      }
      
      const passOk = bcrypt.compareSync(password, userDoc.password);
      
      if (passOk) {
        // Logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
          if (err) {
            throw err;
          }
          
          res.cookie('token', token, { httpOnly: true }).json({
            id: userDoc._id,
            username,
          });
        });
      } else {
        res.status(400).json('Wrong credentials');
      }
    } catch (error) {
      res.status(500).json('An error occurred');
    }
  });


  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });


  app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
  
  });
  
  app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id).exec();
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
  
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath ? newPath : postDoc.cover;
  
      await postDoc.save();
  
      res.json(postDoc);
    });
  });
  
  
  app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });
  
  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })

  app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
  });
  
  

const CONNECTION_URL = 'mongodb+srv://emirsimsek2:emirsimsek2123@cluster0.guunxiz.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error}`);
  });

