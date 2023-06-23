import React,{useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { animateY} from '../utils/motion';
import Editor from './Editor';
import { Link,Navigate } from "react-router-dom";
const CreatePost = () => {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
      async function createNewPost(ev) {
          const data = new FormData();
          data.set('title', title);
          data.set('summary', summary);
          data.set('content', content);
          data.set('file', files[0]);
          ev.preventDefault();
          const response = await fetch('http://localhost:5000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
          });
          if (response.ok) {
            setRedirect(true);
          }
      }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <motion.div animate={animateY()} className="flex justify-center items-center mt-10">
      <form onSubmit={createNewPost} className="w-full max-w-md px-4 py-6 bg-gray-200 rounded-lg">
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
          Create Post
        </button>

      </form>
    </motion.div>
  );
}

export default CreatePost;

