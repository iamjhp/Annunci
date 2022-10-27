import './App.css';
import React from 'react'
import Menu from './components/Header';
import Content from './components/Body';
import {
  Routes, Route
} from "react-router-dom"
import Faq from './components/Faq';
import Home from './components/Home';
import Login from './components/LogIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <div>
      <Menu />
      <Content />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/faq" element={<Faq />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </div>
  )
}

export default App;
