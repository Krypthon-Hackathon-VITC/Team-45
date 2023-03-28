import React, { useState } from "react";
import img from "../assets/appform-bg.jpeg";
import { useNavigate } from "react-router-dom";


const ApplicationForm = ({sharedState, onStateChange}) => {
    const [fullname, setFullname] = useState("");
    const [dob, setDob] = useState("");
    const [phoneno, setPhoneNo] = useState("");
    const [aadharno, setAadharNo] = useState("");
    const [panno, setPanNo] = useState("");
    
    const navigate = useNavigate ();
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/home')

      const name = {name:fullname,dob:dob,phoneno:phoneno,aadhar:aadharno,pancard:panno}
      onStateChange(name)
  
      // Make HTTP request to server-side endpoint
        //   fetch("http://127.0.0.1:8000/users/", {
        //     method: "POST",
        //     body: JSON.stringify({ fullname, dob, phoneno, aadharno, panno }),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.error(error));
  
    
    };

  return (
    <div className=" grid grid-cols-1  xl:grid-cols-2 h-screen w-full">
      <div className="hidden xl:block rounded-lg">
        <img className=" w-full h-screen object-cover" src={img} alt="" />
      </div>
      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
        <form
          //   action="/home"
          onSubmit={handleSubmit}
          className=" max-w-[400px] w-full mx-auto bg-white py-3 px-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">Application Form</h2>
          <div className=" flex flex-col py-1">
            <label htmlFor="fullname">FullName</label>
            <input
              className=" border p-2"
              type="text"
              id="fullname"
              value={fullname}
              placeholder="(As per Aadhar Card)"
              onChange={(event) => setFullname(event.target.value)}
            />
          </div>
          
          <div className=" flex flex-col py-1">
            <label htmlFor="dob">DOB</label>
            <input
              className=" border p-2"
              type="date"
              id="dob"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-1">
            <label htmlFor="phoneno">Phone No</label>
            <input
              className=" border p-2"
              type="tel"
              id="phoneno"
              value={phoneno}
              onChange={(event) => setPhoneNo(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-1">
            <label htmlFor="aadharno">Aadhar Card No</label>
            <input
              className=" border p-2"
              type="number"
              id="aadharno"
              value={aadharno}
              onChange={(event) => setAadharNo(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-1">
            <label htmlFor="panno">Pan Card No</label>
            <input
              className=" border p-2"
              type="number"
              id="panno"
              value={panno}
              onChange={(event) => setPanNo(event.target.value)}
            />
          </div>
          
          <button className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
