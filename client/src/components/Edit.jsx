
import React,{useState,useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { animateY} from '../utils/motion';  
import Editor from './Editor';
import { Link,Navigate ,useParams} from "react-router-dom";

export default function EditPage () {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [Checking,setChecking] = useState(false);
    useEffect(() => {
      fetch('http://localhost:5000/post/'+id)
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        });
    }, []);
  
    async function updatePost(ev) {
      ev.preventDefault();
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
      if (files?.[0]) {
        data.set('file', files?.[0]);
      }
      const response = await fetch('http://localhost:5000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
        
      } 
      else{
            setChecking(true);
      }
    }
    

    return(
        <motion.div animate={animateY()} className="flex justify-center items-center mt-10">
        <form onSubmit={updatePost} className="w-full max-w-md px-4 py-6 mb-10 bg-gray-200 rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 font-bold">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} classNa type="text" id="title" placeholder="Title" className="w-full px-4 py-2 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="block mb-2 font-bold">Summary</label>
            <input value={summary} onChange={e => setSummary(e.target.value)} type="text" id="summary" placeholder="Summary" className="w-full px-4 py-2 rounded" />
          </div>
          <div className="mb-4">
            <label  className="block mb-2 font-bold">File</label>
            <input  onChange={ev => setFiles(ev.target.files)} type="file" id="file" className="w-full px-4 py-2 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 font-bold">Content</label>
            
            <Editor value={content} onChange={setContent} />
          </div>
          <button className='flex justify-center bg-white items-center border-2 border-white p-4 hover:bg-color1 duration-300 hover:text-white w-full py-2 text-center'>
            Update Post
          </button>
          {redirect && 
                <div className="bg-teal-100 border-t-4 text-center border-teal-500 rounded-b text-teal-900 px-2 py-2 mt-3 shadow-md" role="alert">
                <p className="font-bold">Your updates have been successfully done</p>

                    <Link to={'/'} className='text-center rounded-xl hover:bg-color1 hover:text-white duration-300  bg-white p-1'>
                        Go HomePage
                    </Link>
                 
                </div>}
        {Checking &&
           <div className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
           <strong className="font-bold">Holy smokes!</strong>
           <span className="block sm:inline"> Unavaliable Account!</span>
           <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  
           </span>
         </div>
           }
        </form>
  
      </motion.div>
    )
}