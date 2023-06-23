import React,{useContext,useState,useEffect} from 'react'
import {Navigate, useParams} from "react-router-dom";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import {formatISO9075} from "date-fns";
import { BiEdit } from "react-icons/bi";
import { motion } from 'framer-motion';
import { animateX, animateX2, animateY } from '../utils/motion';
import styles, { layout } from "../style";

export default function Profile () {
    const [postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();


    console.log(id);
    useEffect(() => {
      fetch(`http://localhost:5000/post`)
        .then(response => {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
        });
    }, []);
    

    if (!postInfo) return '';
    return(
        <div>
            <motion.h1 animate={animateY()} className={`flex-col text-2xl mt-4 ${styles.paddingX} ${styles.flexCenter}`}>
                <span className='text-gradient font-bold'>{userInfo.username}</span>
                Your Posts
                </motion.h1>
            
              {postInfo.length > 0 ? (
        postInfo.map((post) => (
                <div key={post._id}>
                     {userInfo.id === post.author._id ? (
                        <div className={`flex-col ${styles.paddingX} ${styles.flexCenter}`}  >
                            <div className={`${styles.boxWidth}`}>
                            <section id="hakkımızda" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                                <motion.div animate={animateX} className={layout.sectionInfo}>
                                <h1 className="flex-1 mb-10 font-poppins font-400 ss:text-[52px] text-[32px] text-[#32324e]">
                                    {post.title}
                                    <p>
                                    <span className="text-[20px]">Created by <span className='text-gradient font-bold'> @{post.author.username}</span>
                                <p>
                                <time>Create at: {formatISO9075(new Date(post.createdAt))}</time>
                                </p>
                                    <p className='text-gradient font-bold'>
                                    <Link to={`/postpage/${post._id}`}>
                                        {"Go details ->"}
                                        </Link>
                                    </p>
                                    </span>
                                    </p>
                                
                                    <p>
                                    <h2 className="text-2xl">{post.summary}</h2>
                                    </p>
                                </h1>
                                <p className={`font-poppins font-normal text-[18px] leading-[30.8px] text-black mb-5`}>
                                    {post.content}
                                </p>
                                </motion.div>
                                <motion.div
                                animate={animateX2()}
                                className="flex-1 max-w-max md:ml-10 ml-0 md:mt-0 mt-10 relative flex justify-center items-center opacity-90"
                                >
                                {post.cover && (
                                <img src={'http://localhost:5000/'+post.cover} alt="cover"/>
                                )}
                                </motion.div>
                            </section>
                            </div>
                                </div>
                        ): (<div> No post</div>)}   

                </div>
        ))
      ) : (
        <div className='text-center flex justify-center'>
        No posts yet..
        </div>
      )}
        </div>
    )
}
