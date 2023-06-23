import React, { useContext, useState } from 'react'
import {ImUser} from "react-icons/im";
import {IoFingerPrintOutline } from "react-icons/io5";
import { Link,Navigate } from "react-router-dom";
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { animateY} from '../utils/motion';
import { UserContext } from '../UserContext';
 function Login() {
   const [username, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [redirect,setRedirect] = useState(false);
   const {setUserInfo} = useContext(UserContext)
   const [Checking, setChecking] = useState(false);
   async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
     
       response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
       })
      
    } else {
      setChecking(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <motion.div 
      animate={animateY()}

    className="items-center">
    <div className=" flex flex-col items-center sm: mt-[150px]">
        <h1 className='text-color1 text-[50px] mb-5'>Login</h1>
        <form onSubmit={login}>
        <label className='text-color1 flex flex-gop border-b-2 border-color1'>
        <ImUser size={20}  className=''/>
        <input
         className=" ml-2 bg-transparent border-none " 
         type='text' 
         placeholder='Username...' 
         value={username}
         onChange={e => setUserName(e.target.value)}
      />
        </label>
        <label className='text-color1 flex flex-gop border-b-2 border-color1 mt-5'>
        <IoFingerPrintOutline size={20}  className=''/>
        <input 
        className=" bg-transparent ml-2   " 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
         />
        </label>
        <button className="border-2 p-[5px] bg-color1 px-10 hover:opacity-50 duration-300 text-[white] mt-5 w-[230px]">
               Login    
          </button> 
          </form>
               <h2 className='text-color1 mt-4 hover:opacity-50 duration-300 cursor-pointer'>
               <Link to="/register">
              Don't have an account?
                 </Link> 
               </h2>
               {Checking &&
           <div className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
           <strong className="font-bold">Holy smokes!</strong>
           <span className="block sm:inline"> Unavaliable Account!</span>
           <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  
           </span>
         </div>
           }
               
    </div>
    </motion.div>
  )
}

export default Login;