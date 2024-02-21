import React, { useState,useEffect } from 'react';
import '../../style/Header.css';
import Navbar from './Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import Createroom from './Createroom';
//import Createroom from './Createroom';
//import Plus from './Plus';
export default function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        console.log(data);
        if (data.isAvatarImageSet) {
          console.log("avatar");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
          setCurrentImageType("avatar");
        } else {
          console.log("profile");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.profileImage);
          setCurrentImageType("profile");
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  
}, []);
  return (
    <div className='header-container'>
      <div className='header1'>
        <div className='title1'>
        <GiHamburgerMenu className='header' onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        <header className='heading'>EduShare</header>
        </div>
         <div className='title1'>
         <Createroom/>
         <div className="current-user">
            {currentImageType === "avatar" && (
              <div className="avatar">
                <img
                  className="avatarImage"
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
            )}
            {currentImageType === "profile" && (
              <div className="avatar">
                <img
                  className="avatarImage"
                  src={`http://localhost:3001/files/${currentUserImage}`}
                  alt="avatar"
                />
              </div>
            )}
            <div className="username">
              <h2>Welcome {currentUserName} !</h2>
            </div>
          </div>
          
         </div>
      </div>
      <Navbar show={isNavbarOpen} toggleNavbar={toggleNavbar} />
    </div>
  );
}