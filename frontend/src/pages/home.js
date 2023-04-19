import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import img2 from "../assets/home1-bg.jpg";
import {MdCloudUpload,MdCameraEnhance} from 'react-icons/md'
// import upload1 from "../assets/upload-1.png";
// import upload2 from "../assets/upload-2.png";

const Home = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/upload_page");
  };
  const handleWebUpload = () => {
    navigate("/webcamupload_page");
  };
  return (
    <>
      <Navbar />
      <div className=" grid grid-cols-1 lg:grid-cols-2 h-[90vh] w-full ">
        <div className="w-full h-[90vh] flex flex-col justify-around items-center py-20 px-16 text-[#1F1F1F] ">
          <div className=" mb-5 flex flex-col  w-full">
            <h1 className=" text-5xl text-center lg:text-left font-bold">Document Classifier</h1>
            <h2 className="text-md text-center lg:text-left font-medium mt-6 text-[#5D5D5D]">
            djhfuiegfugeufgeufgdjhfuiegfugeufgeufgdjhfuiegfugeuf
            </h2>
            <h2 className="text-md text-center lg:text-left font-medium text-[#5D5D5D]">geufgdjhfuiegfugeufgeufgdjhfuiegfugeufgeufgdjhfuiegf</h2>
            <h2 className="text-md text-center lg:text-left font-medium mb-6 text-[#5D5D5D]">gfugeufgeufg</h2>
          </div>
          <div className=" w-full text-center flex justify-center ">
            <div className="   rounded-b-2xl rounded-tl-2xl mx-3 bg-gradient-to-br from-blue-600 to-purple-500">
              <div className="  flex flex-col items-center m-1 rounded-b-2xl rounded-tl-2xl bg-white ">
              <div className=" px-6 py-3 text-[#6961E9]">
                <MdCloudUpload size={100}/>
              </div>
            <div className="  w-full py-2 bg-[#9E98F4] duration-200 hover:bg-[#6961E9] text-white rounded-b-2xl font-semibold ">
              <button onClick={handleUpload}>Upload Files</button>
            </div>
            </div>
            </div>
            <div className="    rounded-b-2xl rounded-tr-2xl mx-3 bg-gradient-to-br from-blue-600 to-purple-500 ">
              <div className=" flex flex-col items-center m-1 rounded-b-2xl rounded-tr-2xl bg-white ">
            <div className=" px-6 py-3 text-[#6961E9]">
                <MdCameraEnhance size={100}/>
              </div>
            <div className="  w-full py-2  bg-[#9E98F4] duration-200 hover:bg-[#6961E9] text-white rounded-b-2xl font-semibold ">
              <button onClick={handleWebUpload}>Web Cam</button>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block rounded-lg">
          <img className=" w-full h-full object-contain" src={img2} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;