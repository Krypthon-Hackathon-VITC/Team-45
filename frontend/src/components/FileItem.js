import React from "react";
import {MdDelete} from 'react-icons/md'

const FileItem = ({ file, removeFile }) => {
  return (
    <>
      <div className=" flex justify-around items-center px-4 py-1 mx-3 border-[2px] border-indigo-600 rounded-lg " key={file.name}>
        <div className="  ">
        <p>{file.name}</p>
        </div>
        <div className=" text-red-600 cursor-pointer ml-2">
          {file.isUploading && (
            <div onClick={() => removeFile(file.name)}><MdDelete/></div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileItem;
