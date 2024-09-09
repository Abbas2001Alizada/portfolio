import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/portfolio';
import Contact from './components/contact';
import Login from './components/login';
import Skill from './components/Skill';
import DownloadResume from './components/downloadeResume';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import UpdateCredentials from './components/update cridential';

const App = () => {
  return (
    <div className=" font-sans antialiased bg-white text-gray-900">
      <Navbar />
      <Home />
      <About/>
      <Portfolio />
      <Skill/>
      <Contact />
      <UpdateCredentials/>
    </div>
  );
};

export default App;
