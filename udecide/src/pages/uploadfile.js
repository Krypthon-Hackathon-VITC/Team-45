import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import FileItem from '../components/FileItem'
import {AiFillFileAdd} from 'react-icons/ai'
import img2 from '../assets/kyc-bg.jpg'

const UploadFile = () => {

    const[files,setFiles]=useState([])

    const removeFileHandler = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
      }
    
      const handleFile= (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])
      }

    // const deleteFileHandler = (_name) => {
    //     axios.delete(`http://localhost:8080/upload?name=${_name}`)
    //         .then((res) => removeFile(_name))
    //         .catch((err) => console.error(err));
    // }
    console.log("File:",files)

  return (
    <>
     <Navbar/>
     <div className=' grid grid-cols-1 lg:grid-cols-2 h-screen w-full '>
     
      <div className='hidden sm:block rounded-lg'>
        <img className=' w-full h-full object-contain' src={img2} alt=''/>
        
      </div>

      <div className=' w-full h-screen flex flex-col justify-center items-center'>
            <div className=' text-center text-4xl font-bold my-4'>
                <h1>Upload Files for Verification</h1>
            </div>
            <div className=' text-center'>
                <form  className=' flex flex-col justify-between  mx-auto p-5'>
                    <div className='border-[2px] border-indigo-500 rounded-xl p-20 my-4 '>
                        <div className=' relative  cursor-pointer py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold'>
                        <input className=' relative z-10 opacity-0 max-w-[200px]' onChange={handleFile} type="file" name="file" multiple/>
                        <button className=' absolute z-0 left-0 top-0 flex justify-center items-center  w-full h-full text-3xl text-white'><AiFillFileAdd size={50}  className=' inline '/></button>
                        </div>
                    </div>
                    
                    <div className=' border px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold '>
                        <button>Upload</button>
                    </div>
                </form>
                
            </div>
            <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
