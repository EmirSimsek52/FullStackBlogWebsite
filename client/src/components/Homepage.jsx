import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { animateX, animateX2 } from '../utils/motion';
import Axios from 'axios';
import styles, { layout } from '../style';
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';
function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/post').then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className={`flex-col ${styles.paddingX} ${styles.flexCenter}`}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="" key={post._id}>
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
                   <p>
                   <time>Last Update at: {formatISO9075(new Date(post.updatedAt))}</time>
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
        ))
      ) : (
        <div>
        No posts yet..</div>
      )}
    </div>
  );
}

export default Homepage;

/*  
 const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/users").then((response) => {
      console.log(response.data)
      setListOfUsers(response.data);
    });
  }, []);

         {
          listOfUsers.length >= 0 ?(
            listOfUsers.map((user) => {
              return (
                  <div className='' key={user.id}>
                  <div  className={`${styles.boxWidth}`}>
                    <section id="hakkımızda" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                    <motion.div animate={animateX} className={layout.sectionInfo}>
                      <h2 className="flex-1 mb-10  font-poppins font-400 ss:text-[52px] text-[32px] text-[#32324e]">
                            <h1>{user.title}</h1>
                      </h2>
                      <p className={`font-poppins font-normal  text-[18px] leading-[30.8px] text-black max-w-[470px] `}>
                        {user.info}
                      </p>
                  </motion.div>
                    <motion.div animate={animateX2()} className="flex-1 max-w-max md:ml-10 ml-0 md:mt-0 mt-10 relative flex justify-center items-center opacity-90 ">
                    <img  src={`${user.img}`}  />

                    </motion.div>
                      </section>
                          </div>
                  </div>
              );
            })
          ) :
          <div>Loading.. </div>
          
        
        }

       
        */