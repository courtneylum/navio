// import { useState } from 'react'
import './App.css';
import {Routes, Route} from 'react-router-dom'
// import Signup from './assets/Signup.jsx';
// import Login from './assets/Login.jsx';
import Home from './assets/Home.jsx';

const App = () => (

  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/register" element={<Signup />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/home" element={<Home />} />
    // </Routes>

);

export default App
