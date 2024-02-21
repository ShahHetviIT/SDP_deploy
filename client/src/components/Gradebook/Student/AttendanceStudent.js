import React, { useState, useEffect } from "react";
import Sessional1 from "./Sessional1";
import Sessional2 from "./Sessional2";
import Sessional3 from "./Sessional3";
import "../../../style/Attendance.css";
import { getCurrentStudentRoute } from "../../../utils/APIRoutes";
import axios from "axios";
import Gradebook from "../../../assets/gradebook.png";
import Logout from "../../Logout";

export default function AttendanceStudent() {
  const [sessioanl1, setSessional1] = useState(false);
  const [sessioanl2, setSessional2] = useState(false);
  const [sessioanl3, setSessional3] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);
  const [currentStudent, setCurrentStudent] = useState([]);

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

    const fetchCurrentStudent = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        const getCurrentStudent = await axios.get(
          `${getCurrentStudentRoute}/${data.userId}`
        );
        setCurrentStudent(getCurrentStudent.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
    fetchCurrentStudent();
  }, []);

  const handleSessiaonal1 = () => {
    setSessional1(true);
    setSessional2(false);
    setSessional3(false);
  };

  const handleSessiaonal2 = () => {
    setSessional1(false);
    setSessional2(true);
    setSessional3(false);
  };

  const handleSessiaonal3 = () => {
    setSessional1(false);
    setSessional2(false);
    setSessional3(true);
  };

  return (
    <div className="container-body">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <div className="gradebookTitle">
            <img src={Gradebook} alt="" />
            <div>Gradebook</div>
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
              <h2>Welcome {currentUserName} !</h2>
            </div>
            <Logout />
          </div>
        </div>
      </nav>

      <div className="sessionalButtons">
      <button className="btn">
          <span> Dashboard</span>
        </button>
        <button onClick={handleSessiaonal1} className="btn">
          <span>Sessional 1</span>
        </button>
        <button onClick={handleSessiaonal2} className="btn">
          <span>Sessional 2</span>
        </button>
        <button onClick={handleSessiaonal3} className="btn">
          <span>Sessional 3</span>
        </button>
        <button className="btn">
          <span>External</span>
        </button>
      </div>

      <div className="sessional">
        {sessioanl1 && <Sessional1 currentStudent={currentStudent} />}

        {sessioanl2 && <Sessional2 currentStudent={currentStudent} />}

        {sessioanl3 && <Sessional3 currentStudent={currentStudent} />}
      </div>
    </div>
  );
}
