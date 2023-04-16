import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import FileItem from '../components/FileItem'
import {AiFillFileAdd} from 'react-icons/ai'
import img2 from '../assets/kyc-bg.jpg'
import { useNavigate } from 'react-router-dom';

const UploadFile = ({shareddataState,onStateDataChange}) => {

  const navigate = useNavigate ();

    const[files,setFiles]=useState([])
    const[files1,setFiles1]=useState([])
    const[datares,setDatares]=useState({})
    const[datares1,setDatares1]=useState({})

    const removeFileHandler = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
      }
    
      const handleFile= (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])
      }
      const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (const file of files) {
          formData.append('file', file);
        }
        try {
          const response = await fetch('http://127.0.0.1:8000/upload_img/', {
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

      const removeFile = (filename) => {
        setFiles1(files1.filter(file1 => file1.name !== filename))
      }
    
      const handleFiles= (event) => {
        const file1 = event.target.files[0];
        if(!file1) return;
        file1.isUploading = true;
        setFiles1([...files1, file1])
      }
      const handleUploader = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (const file1 of files1) {
          formData.append('file', file1);
        }
        try {
          const response = await fetch('http://127.0.0.1:8000/upload_img/', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          setDatares1(data.Details)
        } catch (error) {
          console.error(error);
        }
      };
      const Submithandler=()=>{
        const datafile = [datares,datares1]
        onStateDataChange(datafile)
        navigate('/anomalypage')
      }
    
    console.log("File:",files)
    console.log("Filedata1:",datares)
    console.log("Filedat2:",datares1)


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
                        <input className=' cursor-pointer relative z-10 opacity-0 max-w-[200px]' onChange={handleFile} type="file" name="file" multiple/>
                        <button className=' cursor-pointer absolute z-0 left-0 top-0 flex justify-center items-center  w-full h-full text-3xl text-white'><AiFillFileAdd size={50}  className=' inline '/></button>
                        </div>
                    </div>

                    <div className=' border px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold '>
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                </form>

            </div>
            <div className=' w-full flex flex-row justify-center items-center'>
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    removeFile={removeFileHandler} />))

            }
        </div>
        </div>

      </div>  
    </>
  )
}

export default UploadFile;
