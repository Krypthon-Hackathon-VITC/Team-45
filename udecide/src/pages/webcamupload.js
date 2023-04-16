import React from "react";
import Navbar from "../components/Navbar";
import Webcam from "react-webcam";
import { useRef, useState } from "react";

const WebCam = () => {
  const webRef = useRef(null);
  const [webData, setWebData] = useState([]);
  function handleCam() {
    const imageSrc = webRef.current.getScreenshot();
    setWebData([...webData, imageSrc]);
  }
  console.log("webdata:", webData);
  return (
    <>
      <Navbar />
      <div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className=" ">{/* <h1>Upload Using WebCam</h1> */}</div>
          <div className=" text-center ">
            <div className=" ">
              <Webcam ref={webRef} height={400} className=" max-h-[450px]" />
            </div>
            <div className=" border mt-4 px-10 w-[80%] mx-auto py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold ">
              <button onClick={handleCam}>Capture</button>
            </div>
          </div>
          {webData && (
            <div className=" text-center">
              <div className=" grid grid-cols-4 gap-3 mt-5 px-4 py-2">
                {webData.map((image, index) => (
                  <div className=" border-[2px] border-indigo-600 rounded-lg">
                    <img
                      src={image}
                      key={index}
                      alt={`Captured image ${index}`}
                      className=' object-contain'
                    />
                  </div>
                ))}
              </div>
              <div className=" border mt-4 px-10 max-w-[300px] mx-auto py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold ">
                <button>Upload</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WebCam;