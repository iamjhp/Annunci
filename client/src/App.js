import './App.css';
import React from 'react'
import Menu from './components/Header';
import {
  Routes, Route
} from "react-router-dom"
import Home from './components/Home';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import AdForm from './components/AdForm';
import AdDetails from './components/AdDetails';
import About from './components/About';
import MyItem from './components/MyAds';
import NotfoundPage from './components/NotFoundPage';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/new-ad" element={<AdForm />}/>
        <Route path="ads/:id" element={<AdDetails />}/>
        <Route path="/myAds" element={<MyItem />}/>
        <Route path="*" element={<NotfoundPage />}/>
      </Routes>
    </div>
  )
}

export default App;
