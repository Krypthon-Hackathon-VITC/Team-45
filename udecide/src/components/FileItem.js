import React from "react";
import {MdDelete} from 'react-icons/md'

const FileItem = ({ file, removeFile }) => {
  return (
    <>
      <div className=" flex justify-around items-center px-1 py-1 mx-1 border rounded-xl bg-gradient-to-r from-indigo-600  to-indigo-600 ..." key={file.name}>
        <div className=" text-white ">
        <p>{file.name}</p>
        </div>
        <div className=" text-red-600 cursor-pointer">
          {file.isUploading && (
            <div onClick={() => removeFile(file.name)}><MdDelete/></div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileItem;
