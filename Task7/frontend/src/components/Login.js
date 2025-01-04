import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkvalidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { backimg, url } from '../utils/constant';
import { Postreq } from '../utils/Post';
import {addaccesstoken} from "../utils/accesstokenSlice"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignin, setisSignin] = useState(true);
  const [errormsg, seterrormsg] = useState(null);

  const togglesignin = () => {
    setisSignin(!isSignin);
  };

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const signup = async (options) => {
    const data = await Postreq(`${url}register`, options);
    if (!data) {
      throw new Error('Error in Signing up');
    }
    dispatch(addUser(data?.data?.user));
    dispatch(addaccesstoken(data?.data?.accesstoken));
    navigate("/browse");
  };

  const signin = async (options) => {
    const data = await Postreq(`${url}login`, options);
    if (!data) {
      throw new Error('Error in Signing in');
    }
    dispatch(addUser(data?.data?.user));
    dispatch(addaccesstoken(data?.data?.accesstoken));
    navigate("/browse");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");

    let message = checkvalidData(email.current.value, password.current.value);
    seterrormsg(message);
    if (message) return;

    let values = {
      email: email.current.value,
      password: password.current.value,
    };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    if (!isSignin) {
      // Signup
      console.log("register up ")
      values.name = fullname.current.value;
      await signup(options);
    } else {
      // Signin
      console.log("Signing in")
      await signin(options);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img className=" object-cover h-screen md:h-auto md:bg-fixed" src={backimg} alt="background-img" />
      </div>

      <form onSubmit={handleSubmit} className="p-12 bg-opacity-80 bg-black absolute w-full md:w-3/12 my-40 mx-auto right-0 left-0 text-white">
        <h1 className="text-2xl  m-2 p-4 ">{isSignin ? "Sign In " : "Sign Up"}</h1>

        <input
          type="email"
          name="email"
          ref={email}
          placeholder="Email Address"
          className="p-2 m-2 w-full rounded-md bg-gray-700"
          required
        />

        {!isSignin && (
          <input
            type="text"
            ref={fullname}
            name="fullname"
            placeholder="Full Name"
            className="p-2 m-2 w-full bg-gray-700 rounded-md"
          />
        )}

        <input
          type="password"
          ref={password}
          name="password"
          placeholder="Password"
          className="p-2 m-2 w-full bg-gray-700 rounded-md"
          required
        />

        {errormsg && <p className="p-2 text-lg font-bold text-red-600">{errormsg}</p>}

        <button type="submit" className="bg-red-700 p-4 m-2 w-full">
          {isSignin ? "Sign In " : "Sign Up"}
        </button>

        <p onClick={togglesignin} className="cursor-pointer">
          {isSignin ? "New to Netflix? Signup Now " : "Already a User Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
