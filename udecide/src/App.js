
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
