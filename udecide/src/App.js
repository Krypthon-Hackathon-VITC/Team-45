
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from './pages/login';
import Signup from './pages/signup';
import UploadFile from './pages/uploadfile'
import Webcam from './pages/webcamupload'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/upload_page" element={<UploadFile/>} />
        <Route exact path="/webcamupload_page" element={<Webcam/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
