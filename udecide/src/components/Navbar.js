import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const [shownav, setShowNav] = useState(false)
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };
  return (
    <div className="flex flex-col h-[10vh]">
      <div className="flex flex-row w-full justify-between   items-center h-20 px-10 absolute z-10 font-Montserrat ">
        <div className="text-[#2176AE]">
          <h1 className={logo ? " hidden" : "flex text-3xl font-black  "}>
            <a
              href="/home"
              className={
                logo
                  ? " hidden"
                  : "flex text-[#5254BC] text-3xl font-black no-underline  "
              }
            >
              uDecide
            </a>{" "}
          </h1>
        </div>

        <ul className="hidden md:flex">
          <li className="p-7 text-[#5254BC] text-xl font-bold">
            <NavLink to="/home" class="active" id="nav-links">
              Home
            </NavLink>
          </li>
          <li className="p-7 text-[#5254BC] text-xl font-bold">
            <NavLink to="/" id="nav-links">
              KYC
            </NavLink>
          </li>
          <li className="p-7 text-[#5254BC] text-xl font-bold">
            <NavLink to="/" id="nav-links">
              About
            </NavLink>
          </li>
        </ul>

        {/* <div className=' hidden md:flex md:pr-3 justify-between items-center  cursor-pointer'>
                    <button className='rounded-full p-3 bg-black text-white'><a href='/signin' className=' text-white'><FaUserAlt /></a></button>
                    <button className='bg-purple-600 px-6 py-2 mx-2 rounded cursor-pointer text-white hover:bg-red-700  hover:font-bold'><a href='/signup' className=' text-white no-underline'>Sign Up</a></button>
                </div> */}

        <div className="hidden md:h-3">
          <hr />
        </div>
        <div className="md:hidden z-10 text-purple-500" onClick={handleNav}>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          onClick={handleNav}
          className={
            nav
              ? "absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-6 flex flex-col"
              : "absolute left-[-100%]"
          }
        >
          <ul>
            <li className="text-3xl font-bold">uDecide</li>
            <li className="p-4 font-bold text-1xl border-b">
              <a href="/user">Home</a>
            </li>
            <li className="p-4 font-bold text-1xl border-b">
              <a href="/analysis">KYC</a>
            </li>
            <li className="p-4 font-bold text-1xl border-b">
              <a href="/rooms">About</a>
            </li>
          </ul>
          {/* <div className="flex flex-col pb-4">
            <button className="p-3 border bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-md">
              ACCOUNT
            </button>
          </div> */}
          <div className="flex justify-between my-3">
            <FaFacebook className="icon text-2xl cursor-pointer " />
            <FaInstagram className="icon text-2xl cursor-pointer " />
            <FaTwitter className="icon text-2xl cursor-pointer " />
            <FaYoutube className="icon text-2xl cursor-pointer " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
