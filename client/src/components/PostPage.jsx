import React,{useContext,useState,useEffect} from 'react'
import {Navigate, useParams} from "react-router-dom";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import {formatISO9075} from "date-fns";
import { BiEdit } from "react-icons/bi";
import {FcDeleteDatabase} from "react-icons/fc";
import { motion } from 'framer-motion';
import { animateX } from '../utils/motion';
import styles, { layout } from "../style";
import axios from 'axios';
export default function PostPage  ()  {
    const [postInfo,setPostInfo] = useState(null);
    const [sure,setSure] = useState(false);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    const [deleteSucces,setDeleteSucces] = useState(false);
    if (deleteSucces) {
      return <Navigate to="/" />;
    }
    console.log(id);
    useEffect(() => {
      fetch(`http://localhost:5000/post/${id}`)
        .then(response => {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
        });
    }, []);

    const handleDelete = async () => {
      try {
        axios.delete(`http://localhost:5000/post/${id}`);
        setDeleteSucces(true);
        alert('Post deleted successfully')
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting token:', error);
      }
    };
    
    function sureDelete() {
      setSure(true);
    }
    function sureCancel() {
      setSure(false);
    }

    if (!postInfo) return null; 
  
  return (
    <motion.div animate={animateX()} className={`${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
  
    <div className={'flex-1 justify-center items-center flex-col'}>
      <h2 className=" text-center ml-6 mb-10 font-poppins font-400 ss:text-[52px] text-[32px] text-[#32324e]">
        {postInfo.title}
        <p className='text-[30px] text-gradient font-bold'>
             @{postInfo.author.username}
        </p>
                {userInfo.id === postInfo.author._id && (
                  <div className='flex justify-center flex-col'>
                  <div className='flex flex-row justify-center'>
                <div className='flex justify-center items-center flex-row m-4'>
                <Link to={`/edit/${postInfo._id}`}  className='flex justify-center items-center flex-row hover:opacity-50 duration-300'>
                        <BiEdit size={30} />
                        <span className='text-[20px]'>Edit</span>
                </Link>
                </div>
                <div className='flex justify-center items-center flex-row'>
                <button onClick={sureDelete} className='flex justify-center items-center flex-row hover:opacity-50 duration-300'>
                        <FcDeleteDatabase size={30} />
                        <span className='text-[20px] ml-2'>Delete</span>
                </button>
                </div>
                </div>
                {
                    sure && (
                      <div className='text-center text-[20px] mb-4 '>
                        Are you sure want to delete this post?
                        <div className='flex flex-row justify-center'>
                          <Link to={'/'} onClick={handleDelete} className='mr-4 border-2 hover:bg-color1 hover:text-white duration-300 cursor-pointer border-color1 px-2'>Delete</Link>
                          <span onClick={sureCancel} className='mr-4 border-2 hover:bg-color1 hover:text-white duration-300 cursor-pointer border-color1 px-2'>Cancel</span>
                        </div>
                        {
                          deleteSucces && (
                            <div className="bg-teal-100 border-t-4 text-center border-teal-500 rounded-b text-teal-900 px-2 py-2 mt-3 shadow-md" role="alert">
                <p className="font-bold">Your updates have been successfully done</p>

                    <Link to={'/'} className='text-center rounded-xl hover:bg-color1 hover:text-white duration-300  bg-white p-1'>
                        Go HomePage
                    </Link>
                 
                </div>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                )}  
      </h2>
      <p className={`font-poppins font-normal mb-4 text-[18px] leading-[30.8px] text-black  `}>
        <p>
        <time>Create at: {formatISO9075(new Date(postInfo.createdAt))}</time>
        </p>
        <p>
        <time>Last Update at: {formatISO9075(new Date(postInfo.updatedAt))}</time>
        </p>
            <p className='text-[30px] mb-4'>
                {postInfo.summary} 
            </p>
            {postInfo.content}
      </p>
    </div>

    <div className="flex-1 max-w-max md:ml-10 ml-0 md:mt-0 mt-10 relative flex justify-center items-center opacity-90 ">
    <img src={`http://localhost:5000/${postInfo.cover}`} alt=""/>    
    </div>

  </div>
  </motion.div>
  )
}

