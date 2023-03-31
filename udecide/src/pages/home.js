import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import img2 from "../assets/home1-bg.jpg";

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
      <div className=" grid grid-cols-1 lg:grid-cols-2 h-screen w-full ">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className=" text-center mb-5">
            <h1 className=" text-4xl font-bold">Document Classifier</h1>
            <h3 className=" text-2xl font-medium my-6">
              Verify your Documents in no time with us now
            </h3>
          </div>
          <div className=" w-full text-center flex justify-around">
            <div className=" border px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold ">
              <button onClick={handleUpload}>Upload Files</button>
            </div>
            <div className=" border px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold ">
              <button onClick={handleWebUpload}>Web Cam</button>
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