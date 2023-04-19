import React, { useState } from "react";
import Navbar from "../components/Navbar";
import img from "../assets/aadhar.jpeg";
import img1 from "../assets/pan.jpeg";

const UploadedFile = [
  {
    file1: [
      {
        name: "Arjun",
        aadharno: 234556,
      },
    ],
    file2: [
      {
        name: "Arjun",
        aadharno: 234556,
        panno: 2314555,
      },
    ],
    file3: [
      {
        name: "Arjuna",
        panno: 2314555,
      },
    ],
  },
];

const FileChecker = ({shareddataState,sharedState,onStateDataChange}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  console.log("userData:",shareddataState)
  console.log("usersData",sharedState.name)
  const file1 = UploadedFile[0].file1[0];
  const file2 = UploadedFile[0].file2[0];
  const file3 = UploadedFile[0].file3[0];

  let message1 = "";
  let message2 = "";
  let match = true;

  if (shareddataState[0].name === sharedState.name && shareddataState[0].aadharno === sharedState.aadhar) {
    message1 +=
      "Aadhar name and Aadhar number match Your Details name and Aadhar number. ";
  } else {
    match = false;
    if (shareddataState[0].name !== sharedState.name) {
      message1 += "Aadhar name does not match Your Details name. ";
    }
    if (shareddataState[0].aadhaar_number !== sharedState.aadhar) {
      message1 += "Aadhar Aadhar number does not match Your Details Aadhar number. ";
    }
  }

  if (shareddataState[1].name === sharedState.name && shareddataState[1].aadhaar_number === sharedState.pancard) {
    message2 += "PAN name and PAN number match Your Details name and PAN number. ";
  } else {
    match = false;
    if (shareddataState[1].name !== sharedState.name) {
      message2 += "PAN name does not match Your Details name. ";
    }
    if (shareddataState[1].aadhaar_number !== sharedState.pancard) {
      message2 += "PAN PAN number does not match Your Details PAN number. ";
    }
  }

  if (match) {
    return (
      <div>
        <p>All files match.</p>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Navbar />
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className=" flex flex-col justify-around items-center">
            <h1 className=" text-3xl">Your Application Details</h1>
            <div className=" flex flex-row justify-around items-center">
              <div
                className=" w-[200px] h-[140px] flex flex-col justify-around items-center rounded-xl m-10   "
                onMouseEnter={flipCard}
                onMouseLeave={flipCard}
              >
                <div className={` card ${isFlipped ? "flipped" : ""}`}>
                  <div className=" front">
                    <img src={img} alt="" />
                  </div>
                  <div className="back">
                    <div className="py-10 px-6">
                      <div>Name: {shareddataState[0].name}</div>
                      <div>Aadhar No: {shareddataState[0].aadhaar_number}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-[200px] h-[140px] flex flex-col justify-around items-center rounded-xl m-10 py-10 shadow-xl shadow-indigo-500 scale-110 ">
                <div>Name: {sharedState.name}</div>
                <div>Aadhar No: {sharedState.aadhar}</div>
                <div>Pan No: {sharedState.pancard}</div>
              </div>
              <div
                className=" w-[200px] h-[140px] flex flex-col justify-around items-center rounded-xl  m-10 "
                onMouseEnter={flipCard}
                onMouseLeave={flipCard}
              >
                <div className={` card ${isFlipped ? "flipped" : ""}`}>
                  <div className=" front">
                    <img src={img1} alt="" />
                  </div>
                  <div className="back">
                    <div className=" py-10 px-6">
                      <div>Name: {shareddataState[1].name}</div>
                      <div>Pan No: {shareddataState[1].aadhaar_number}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row justify-between">
            <div className=" m-2 p-2 border-[2px] border-indigo-500 rounded-lg">{message1}</div>
            <div className=" m-2 p-2 border-[2px] border-indigo-500 rounded-lg">{message2}</div>
          </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FileChecker;
