import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import FileItem from '../components/FileItem'
import {AiFillFileAdd} from 'react-icons/ai'
import img2 from '../assets/kyc-bg.jpg'
import { useNavigate } from 'react-router-dom';

const UploadFile = ({shareddataState,onStateDataChange}) => {

  const navigate = useNavigate ();

    const[files,setFiles]=useState(null)
    const[datares,setDatares]=useState({})
    

    const removeFileHandler = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
      }
    
      // const handleFile= (event) => {
      //   const file = event.target.files;
      //   if(!file) return;
      //   file.isUploading = true;
      //   setFiles([file])
      // }
      const handleUpload = async (event) => {
        event.preventDefault();
        if(!files){
          return;
        }
        const formData = new FormData();
        // formData.append('file',files)
        // formData.append('fileName', files.name);
        for (let i=0;i<files.length;i++) {
          formData.append(`file`, files[i]);
        }
        console.log("fileForm",formData)
        try {
          const response = await fetch('http://192.168.1.13:5000/extract_details', {
            method: 'POST',
            body: formData,
            
          });
          const data = await response.json();
          console.log(data);
          setDatares(data.Details)

        } catch (error) {
          console.error(error);
        }
      };

      
    
      
      
    // let filedata = [files[0].name]
    console.log("File:",files)
    // console.log("Filedata1:",filedata)


  return (
    <>
     <Navbar/>
     <div className=' grid grid-cols-1 lg:grid-cols-2 h-[90vh] w-full '>

      <div className='hidden sm:block rounded-lg'>
        <img className=' w-full h-full object-contain' src={img2} alt=''/>

      </div>

      <div className=' w-full h-[90vh] flex flex-col justify-center items-center'>
            <div className=' text-center text-4xl font-bold my-4'>
                <h1>Upload Files for Verification</h1>
            </div>
            <div className=' text-center'>
                <form  className=' flex flex-col justify-between  mx-auto p-5'>
                    <div className='border-[2px] border-indigo-500 rounded-xl p-20 my-4 '>
                        <div className='  relative  cursor-pointer py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold'>
                        <input className=' cursor-pointer relative z-10 opacity-0 max-w-[200px]' onChange={(e)=>setFiles(e.target.files)} type="file" name="file" multiple/>
                        <button className=' cursor-pointer absolute z-0 left-0 top-0 flex justify-center items-center  w-full h-full text-3xl text-white'><AiFillFileAdd size={50}  className=' inline '/></button>
                        </div>
                    </div>

                    <div className=' border px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold '>
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                </form>

            </div>
            {/* <div className=' w-full flex flex-row justify-center items-center'>
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    removeFile={removeFileHandler} />))

            }
        </div> */}
        </div>

      </div>  
    </>
  )
}

export default UploadFile;
