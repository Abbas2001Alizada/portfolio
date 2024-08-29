import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [hovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios. post('http://localhost:3002/sendMail', {formData });
setFormData({ name: '', email: '', message: '' });
       
 
      }
   catch (error) {
      console.error('Error:', error);
    }
    finally{ }
  };


  return (
    <section
      id="contact"
      className=" max-w-full py-16 bg-white grid grid-cols-1 md:grid-cols-2"
    >
      <div className="px-4 w-full">
        <form onSubmit={handleSubmit} className="block w-full">
          <div className="mb-4">
            <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
      <div className="py-4 content-center ">
        <div className=" px-4     flex ">
          <MdEmail
            className={` ${hovered? "animate-none":"animate-bounce"}  `}
            size={24}
          />
          <p onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className="hover:text-blue-500  px-4 hover:scale-110 transform transition-transform duration-300">
         
            Email: Abbas.alizadah1380@gmail.com
          </p>
        </div>
        <div className=" px-4 flex    ">
          <FaPhoneSquareAlt className={` ${hovered? "animate-none":"animate-horizontalBounce"}  `} size={24} />
          <p onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className="hover:text-blue-500  px-4 hover:scale-110 transform transition-transform duration-300">
            Phone: (+93)777858323
          </p>
        </div>{" "}
        <div className=" px-4 flex  ">
          <FaWhatsappSquare className={` ${hovered? "animate-none":"animate-bounce"}  `} size={24} />
          <p onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className="hover:text-blue-500  px-4 hover:scale-110 transform transition-transform duration-300">
            whatsapp: (+93) 78 546 8208
          </p>
        </div>{" "}
        <div className=" px-4 flex  ">
          <FaGithubSquare className={` ${hovered? "animate-none":"animate-horizontalBounce"}  `} size={24} />
          <a onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            href="https://github.com/Abbas2001Alizada"
            className="hover:text-blue-500 px-4 hover:scale-110 transform transition-transform duration-300"
          >
            GitHub: Abbas2001Alizada
          </a>
        </div>{" "}
        <div className=" px-4 flex   ">
          <FaFacebookSquare className={` ${hovered? "animate-none":"animate-bounce"}  `} size={24} />
          <a onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            href="https://www.facebook.com/abbas.alizadah.1380?mibextid=ZbWKwL"
            className="hover:text-blue-500 px-4 hover:scale-110 transform transition-transform duration-300"
          >
            Facebook:Ali Abbas
          </a>
        </div>{" "}
        <div className=" px-4 flex ">
          <FaLinkedin className={` ${hovered? "animate-none":"animate-horizontalBounce"}  `} size={24} />
          <a onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}
            href="http://www.linkedin.com/in/abbas-alizadah-40aa3a198"
            className="hover:text-blue-500 px-4 hover:scale-110 transform transition-transform duration-300"
          >
            LinkedIn: www.linkedin.com/in/abbas-alizadah-40aa3a198
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
