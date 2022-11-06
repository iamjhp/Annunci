import './App.css';
import React from 'react'
import Menu from './components/Header';
import {
  Routes, Route
} from "react-router-dom"
import Faq from './components/Faq';
import Home from './components/Home';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import AdForm from './components/AdForm';
import AdDetails from './components/AdDetails';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/faq" element={<Faq />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/new-ad" element={<AdForm />}/>
        <Route path="ads/:id" element={<AdDetails />}/>
      </Routes>
    </div>
  )
}

export default App;
