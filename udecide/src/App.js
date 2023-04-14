
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationForm from "./pages/applicationForm";
import Home from "./pages/home";
import Login from './pages/login';
import Signup from './pages/signup';
import UploadFile from './pages/uploadfile'
import Webcam from './pages/webcamupload'
import Anomaly from './pages/Anomalyresult'
import React, {useState} from "react";

function App() {

  const [sharedState, setSharedState] = useState([]);

  const [shareddataState, setSharedDataState] = useState('');

  const handleStateChange = (newState) => {
    setSharedState(newState);
  };
  const handleStateDataChange = (newDataState) => {
    setSharedDataState(newDataState)
  }
  console.log("name:",sharedState)
  console.log("dataupload:",shareddataState)

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/appform" element={<ApplicationForm sharedState={sharedState} onStateChange={handleStateChange}/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/upload_page" element={<UploadFile shareddataState={shareddataState} onStateDataChange={handleStateDataChange}/>} />
        <Route exact path="/webcamupload_page" element={<Webcam/>} />
        <Route exact path="/anomalypage" element={<Anomaly shareddataState={shareddataState} sharedState={sharedState} onStateDataChange={handleStateDataChange}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
