import React, { useState } from "react";
import img1 from "../assets/login-bg.jpg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one letter and one number.');
      return;
    }

    // Make HTTP request to server-side endpoint
    //     fetch("/register", {
    //       method: "POST",
    //       body: JSON.stringify({ username, email, password }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => console.log(data))
    //       .catch((error) => console.error(error));

    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
  };

  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 h-screen w-full">
      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
        <form
          //   action="/home"
          onSubmit={handleSubmit}
          className=" max-w-[400px] w-full mx-auto bg-white p-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">uDecide</h2>
          <div className=" flex flex-col py-2">
            <label htmlFor="username">Username</label>
            <input
              className=" border p-2"
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input
              className=" border p-2"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input
              className=" border p-2"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
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

export default Signup;
