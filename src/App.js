import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import UpperNavbar from "./components/UpperNavbar";
import Landing from "./components/Landing";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Steps from "./components/Steps";
import Footer from "./components/Footer";


import './App.css';
import Login from "./components/Login";
import React, { useState,useRef } from 'react';
import Signup from "./components/SignUp";
import Profile from "./components/Profile";
import Test from "./components/Test";
import Check from "./components/Check";
import StartTest from "./components/StartTest";



function App() {
  const [ sessionExists, setSessionExists ] = useState('');
  const servicesRef = useRef(0);




  return (
    <div className="App">
      <UpperNavbar servicesRef={servicesRef} sessionExists={sessionExists} setSessionExists={setSessionExists}/>
      <Navbar />


      <Routes>
        <Route path="/" element={
          <>
            <Landing/>

            <About />
            <Steps />

            <Services servicesRef={servicesRef}/>
            <Contact />

          </>
        } />

      <Route path="/login-user" element={
          <>

          <Login sessionExists={sessionExists} setSessionExists={setSessionExists}/>

          </>
        } />

  <Route path="/signup" element={
            <>

            <Signup/>

            </>
          } />

<Route path="/profile" element={
            <>

            <Profile/>

            </>
          } />

<Route path="/test" element={
          <>

          <Test />

          </>
        } />

<Route path="/online-test-check" element={
          <>

          <Check />

          </>
        } />

        
<Route path="/start-test" element={
          <>

          <StartTest />

          </>
        } />


      </Routes>

    

      <Footer />

    </div>
  );
}

export default App;
