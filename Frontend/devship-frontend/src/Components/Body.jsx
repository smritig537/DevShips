import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Nabar";   
import Footer from "./Footer"


const Body = () => {
  return (
    <>
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
      
      
    </>
  );
};

export default Body;
