import React from "react";
import Tick from '../assets/correct.jpg'
import Wrong from '../assets/incorrect.jpg'
import Navbar from "../components/Navbar";
import { TiTick} from 'react-icons/ti';
import {RiErrorWarningFill} from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

const Anomalypage = () => {
    const navigate = useNavigate();

  const handleCorrect = () => {
    navigate("/correctresult");
  };
  const handleIncorrect = () => {
    navigate("/incorrectresult");
  };
  return (
    <>
      <Navbar />
      <div className="w-full h-[90vh] grid grid-rows-2 px-32">
        <div className=" w-full flex flex-row">
          <div className=" w-[60%] flex flex-col justify-between items-end pb-10">
            <div className=" text-center font-bold text-xl mr-4 ">Correct Information</div>
            <div className="  rounded-2xl bg-gradient-to-br from-blue-600 to-purple-500 px-2 flex flex-col justify-center  items-center">
                <div className="  my-2    rounded-2xl flex flex-col bg-white  items-center ">
              <div  className=" w-[200px] h-[170px] rounded-2xl">
                <img className="rounded-2xl object-contain" src={Tick} alt="" />
              </div>
              <div onClick={handleCorrect}  className=" w-full py-2 bg-[#9E98F4] duration-200 hover:bg-[#6961E9] text-white rounded-b-2xl font-semibold ">
                <button className=" w-full ">Details</button>
              </div>
              </div>
            </div>
          </div>
          <div className=" w-[40%] flex flex-col justify-center items-center text-green-600">
          <TiTick  size={100}/>
          </div>
        </div>
        <div className=" w-full flex flex-row border-t-2 border-black">
        <div className=" w-[60%] flex flex-col justify-between items-end pb-8 pt-4">
            <div className=" text-center font-bold text-xl mr-1 ">Incorrect Information</div>
            <div className="  rounded-2xl bg-gradient-to-br from-blue-600 to-purple-500 px-2 flex flex-col justify-center  items-center">
                <div className="  my-2  rounded-2xl bg-white  flex flex-col  items-center ">
              <div  className=" w-[200px] h-[170px]  rounded-2xl">
                <img className="rounded-2xl object-contain" src={Wrong} alt="" />
              </div>
              <div onClick={handleIncorrect}  className=" w-full py-2 bg-[#9E98F4] duration-200 hover:bg-[#6961E9] text-white rounded-b-2xl font-semibold ">
                <button className=" w-full ">Details</button>
              </div>
              </div>
            </div>
          </div>
          <div className=" w-[40%] flex flex-col justify-center items-center text-red-600">
          <RiErrorWarningFill  size={100}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Anomalypage;
