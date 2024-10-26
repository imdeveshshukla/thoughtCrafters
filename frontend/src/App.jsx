import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import Blogs from './pages/Blogs';
import { CreateBlog } from './pages/CreateBlog';
import { OpenBlog } from './pages/OpenBlog';
function App() {
  const UserContext = createContext(null);
  const [auth,setAuth] = useState(false);
  const isLogin = async ()=>{
    const res = await axios.post("hodfla");
    setAuth(true);
  }
  useEffect(() => {
    
  }, [])
  
  return (
    <>
    <UserContext.Provider value={auth}>
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs/>}>
          </Route>
          <Route path="/create" element={<CreateBlog/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/blog/:id' element={<OpenBlog />}/>
        </Routes>
      </BrowserRouter>
    </>
    </UserContext.Provider>
    </>
  )
}

export default App
