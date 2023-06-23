import React, { useState } from 'react'
import {ImUser} from "react-icons/im";
import {IoFingerPrintOutline } from "react-icons/io5";
import { FiMail,FiPhone } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animateY} from '../utils/motion';
function Register() {
const [username , setUserName] = useState('');
const [password , setPassword] = useState('');
const [handle, setHandle]= useState(false);

const handleNav = () => {
  setHandle(true)
}
 async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
      handleNav();
    } else {
      alert('registration failed');
    }
  }

  return (
    <motion.div 
    animate={animateY()}
    className="items-center">
    <div className=" flex flex-col items-center sm: mt-[150px]">
        <h1 className='text-color1 text-[50px] mb-5'>Register</h1>
        <form onSubmit={register}>
              <label className='text-color1 flex flex-gop border-b-2 border-color1'>
              <ImUser size={20}  className=''/>
              <input
              className=" ml-2 bg-transparent border-none "
                type='text' 
                placeholder='Username...'
                value={username}
                onChange={e => setUserName(e.target.value)}/>
              </label>
              <label className='text-color1 flex flex-gop border-b-2 border-color1 mt-5'>
              <IoFingerPrintOutline size={20}  className=''/>
              <input 
              className="  ml-2 bg-transparent  "
              type="password" 
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
              </label>
              <button className="border-2 p-[5px] px-10 hover:opacity-50 bg-color1 duration-300 text-[white] mt-5" 
             >
               SING UP   
               </button> 
        </form>
              
               <h2 className='text-color1  mt-4 hover:opacity-50 duration-300 cursor-pointer'>
                {handle && "You have successfully registered."}<p/>
               </h2>
               <h2  className='text-color1 mt-4  hover:opacity-50 duration-300 cursor-pointer'>
               {handle && <Link to="/login">Login NOW!</Link>}
               </h2>
               
    </div>
    </motion.div>
  )
}

export default Register