import React from "react";
import img1 from "../assets/login-bg.jpg";

const signup = () => {
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 h-screen w-full">
      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
        <form
          action="/home"
          className=" max-w-[400px] w-full mx-auto bg-white p-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">uDecide</h2>
          <div className=" flex flex-col py-2">
            <label>Username</label>
            <input className=" border p-2" type="text" />
          </div>
          <div className=" flex flex-col py-2">
            <label>Email</label>
            <input className=" border p-2" type="email" />
          </div>
          <div className=" flex flex-col py-2">
            <label>Password</label>
            <input className=" border p-2" type="password" />
          </div>
          <button className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Register
          </button>
          <div className=" flex justify-between">
            <p className=" flex items-center">
              <input className=" mr-2" type="checkbox" />
              Remember me
            </p>
            <p>
              <a href="/login">Already have account?</a>
            </p>
          </div>
        </form>
      </div>
      <div className="hidden  xl:block rounded-lg">
        <img className=" w-full h-full object-cover" src={img1} alt="" />
      </div>
    </div>
  );
};

export default signup;
