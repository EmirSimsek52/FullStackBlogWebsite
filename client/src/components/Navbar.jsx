import React, {useContext, useEffect, useState} from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import * as Login from './Login';
import { motion } from 'framer-motion';
import { UserContext } from '../UserContext';
const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
    
    const {setUserInfo,userInfo} = useContext(UserContext);

    const variants = {
      open: { opacity: 1, x: 0 },
      closed: { opacity: 0, x: "-100%" },
    }
    useEffect(() => {
      fetch('http://localhost:5000/profile', {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        })
      });
    }, []);

    function logout() {
      fetch('http://localhost:5000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
      
    }
    
    const username = userInfo?.username;

  return (
    <div className=' w-full h-[90px] bg-[#92A9BD] '>
      <div className='max-w-[1240px] mx-auto px-5 flex justify-between items-center h-full'>
     
        <div className='flex justify-start'>
         <Link to={"/"}>
         <h1 className='text-gradient  ss:text-[40px] text-[35px]'>NexusBlog</h1>
         </Link> 
        
          
        </div>
      
        <div className='hidden md:flex'>

          {username &&(
                        <ul className=' flex text-white items-center cursor-pointer'>
                           <Link to={`/profile`}>
                          <li className='text-2xl'>Welcome 
                            <Link to={'/profile'}>
                            <span className='text-center  text-gradient font-bold text-2xl'> {username}</span>
                            </Link>
                          </li>
                          </Link>
                        <li className='sm:pl-10 pl-5'>
                            <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                              <Link to="/createpost">
                            Create a post
                               </Link>     
                            </button> 
                        </li>
                        <li className='sm:pl-10 pl-5'>
                            <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 "
                            onClick={logout}>
                              
                            logout
                                  
                            </button> 
                        </li>
                      </ul>
          )}

          {!username && (
                 <ul className=' flex text-white items-center cursor-pointer'>
             
                 <li className='sm:pl-10 pl-5'>
                     <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                       <Link to="/login">
                     Login
                        </Link>     
                     </button> 
                 </li>
                 <li className='sm:pl-10 pl-5'>
                     <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                       <Link to="/register">
                     Register
                        </Link>     
                     </button> 
                 </li>
               </ul>
          )}

           
        </div>

        {/* Hamburger menu */}
        <div onClick={handleNav} className='block md:hidden'>
            {nav ? <AiOutlineClose size={30} className='text-[#66FCF1]' /> : <AiOutlineMenu size={30} className='text-[#66FCF1]' />}
          
          
        </div>

        {/* Mobile Menu */}
        <motion.nav 
         animate={nav ? "open" : "closed"}
         variants={variants}
        className={nav ? 'bg-[#92A9BD] py-1 px-2 rounded-3x2 w-full  text-white absolute top-[90px] left-0 flex justify-center text-center' : 
    'absolute left-[-100%]'}>
        {username &&(
                        <ul className=' m-2 text-white items-center cursor-pointer'>
                      <Link to={`/profile`}>
               <li className='text-2xl mb-3'>Welcome
               <span className='text-gradient font-bold text-2xl'> {username}</span>
               </li>
               </Link>      
                        <li className='sm:pl-10 mb-4 pl-5'>
                            <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                              <Link to="/createpost">
                            Create a post
                               </Link>     
                            </button> 
                        </li>
                        <li className='sm:pl-10 pl-5'>
                        <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 "
                            onClick={logout}>
                              
                            logout
                                  
                            </button> 
                        </li>
                      </ul>
          )}

          {!username && (
                 <ul className='  text-white m-4 items-center cursor-pointer'>
             
                 <li className='sm:pl-10 pl-5 mb-3'>
                     <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                       <Link to="/login">
                     Login
                        </Link>     
                     </button> 
                 </li>
                 <li className='sm:pl-10 pl-5'>
                     <button className="border-2 p-[5px]  px-5 hover:bg-color1 duration-300 ">
                       <Link to="/register">
                     Register
                        </Link>     
                     </button> 
                 </li>
               </ul>
          )}

        </motion.nav>
      </div>
    </div>
  );
};

export default Navbar;