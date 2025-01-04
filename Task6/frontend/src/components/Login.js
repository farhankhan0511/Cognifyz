import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkvalidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { backimg } from '../utils/constant';



const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [isSignin,setisSignin]=useState(true);
  const [errormsg,seterrormsg]=useState(null)
const togglesignin=()=>{
  setisSignin(!isSignin)
}
const email=useRef(null);
const password=useRef(null);
const fullname=useRef(null);


const handlebuttonclick=()=>{
let message=checkvalidData(email.current.value,password.current.value)
  seterrormsg(message)
  if (message) return
  //sign in or sign up

  if(!isSignin){
    //signup
   
// createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
// .then((userCredential)=>{
//   const user =userCredential.user;
//   console.log(user)
//   updateProfile(user,{
//     displayName:fullname.current.value,

//   })
//   .then(()=>{
//     const {uid,email,displayName}=auth.currentUser;
//     dispatch(addUser({
//       uid:uid,email:email,displayName:displayName
//     }))
//     navigate("/browse")
//   }) 

// })

// .catch((error)=>{
//   const errorcode=error.code;
//   const errormessage=error.message;

//   seterrormsg(errorcode +"-"+errormessage)
  
// })
  }
  else{
//sign in logic
// signInWithEmailAndPassword(auth, email.current.value, password.current.value)
// .then((userCredential)=>{
//   const user =userCredential.user;
  
 
  

// })
// .catch((error)=>{
//   const errorcode=error.code;
//   const errormessage=error.message;
  
//   seterrormsg(errorcode +"-"+errormessage)
// })
  }



}

  return (
    <div>
        <Header/>
        <div className='absolute '>
            <img  className=" object-cover h-screen md:h-auto md:bg-fixed" src={backimg} alt="background-img"/>
        </div>

        <form  onSubmit={(e)=>e.preventDefault()} className='p-12 bg-opacity-80 bg-black absolute  w-full md:w-3/12 my-40 mx-auto  right-0 left-0 text-white'>

        <h1 className='text-2xl  m-2 p-4 '>{isSignin? "Sign In ": "Sign Up"}</h1>
      
      <input type="email"  name='email'
      ref={email} placeholder='Email Address' className='p-2 m-2 w-full rounded-md bg-gray-700' required/>

      {
        !isSignin && (<input type="text"   ref={fullname} name="fullname" placeholder='Full Name' className='p-2 m-2 w-full bg-gray-700 rounded-md'/>)
      }

      <input type="password" 
      ref={password} name="password"
      placeholder='Password' className='p-2 m-2 w-full bg-gray-700 rounded-md' required/>

{errormsg && <p className='p-2 text-lg font-bold text-red-600'>{errormsg}</p>}

      <button onClick={handlebuttonclick} className=" bg-red-700 p-4 m-2  w-full">{isSignin? "Sign In ": "Sign Up"}</button>

      

      <p onClick={togglesignin} className='cursor-pointer'>{isSignin? "New to Netflix? Signup Now ": "Already a User Sign In Now"} </p>
    </form> 
    </div>
    
  )
}

export default Login