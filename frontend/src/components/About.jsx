import React from "react";
import Abbas from '../../public/photos/photo.png'

const About = () => {
  const overlayStyle = {
    backdropFilter: "blur(50px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly updated for better visibility
  };

  return (
    <section
      id="about"
      className=" md:rounded-br-full py-4 relative shadow-xl bg-black h-screen text-center grid grid-cols-1 md:grid-cols-2"
    >
      <div className="  content-center  " >
       
        <div className="w-full sm:w-2/3 lg:w-1/2 p-8 bg-black rounded-r-lg ">
          <h2 className="text-white text-2xl md:text-4xl font-bold font-hamilton mb-4 animate-pulse">About Me</h2>
          <p className="text-sm md:text-lg mb-4 text-white ">
          I am Abbas Alizada from Kabul Afghanistan. I have bachelor of computer science in Informations system department.I have graduated recently from Kabul Polytechnic University. My work experience is on my github and on this page bellow.  </p>
          {/* <p className="text-sm md:text-base text-white animate-blink">
            Working on several projects that are on my GitHub, made to learn lots of
            titles I still did not see.
          </p> */}
        </div>
      </div>
      <div className="flex justify-center items-center w-full align-center ">
        <img src={Abbas} sizes="" alt="" className=" w-56 rounded-full ms:rounded-full md:rounded-l-full " />
      </div>
    </section>
  );
};

export default About;
