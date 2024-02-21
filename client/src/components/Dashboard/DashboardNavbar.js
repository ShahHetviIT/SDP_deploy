import React, { useState, useEffect } from "react";
import MentorMingle from "../../assets/mentor-mingle.png"
import Logout from "../Logout";

export default function DashboardNavbar() {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        if (data.isAvatarImageSet) {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
          setCurrentImageType("avatar");
        } else {
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
    <>
      <div className="image">
        <div>
            <img src={MentorMingle} alt=""/>
        </div>
        <div>Mentor Mingle</div>
      </div>
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
              <h2 style={{fontSize: "1.1em"}}>Welcome {currentUserName} !</h2>
            </div>
            <div>
            <Logout />
            </div>
          </div>
    </>
  );
}
