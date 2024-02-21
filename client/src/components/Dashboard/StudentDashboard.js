import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCurrentStudentRoute } from "../../utils/APIRoutes";
import StudentProfile from "./StudentProfile";
import DashboardNavbar from "./DashboardNavbar";
import Background from "../../assets/background1.avif";

function StudentDashboard() {
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState([]);

  useEffect(() => {
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

    fetchCurrentStudent();
  }, []);
  const handleTutorBot = () => {
    navigate("/chatbox");
  };

  const handleProfileImage = () => {
    navigate("/select");
  };

  const handleGradebook = () => {
    navigate("/attendanceStudent");
  };

  const handleEdushare = () => {
    navigate("/edushare");
  };

  return (
    <Container>
      <div className="dashboardContainer">
        <div className="dashboardNavbar">
          <DashboardNavbar />
        </div>
        <div className="allBtns">
          <div className="btn-container1">
            <div className="btn-container2">
              <button onClick={handleTutorBot} className="btn">
                <span>TutorBot</span>
              </button>
              <button onClick={handleEdushare} className="btn">
                <span>EduShare</span>
              </button>
            </div>
            <div className="btn-container2">
              <button onClick={handleGradebook} className="btn">
                <span>Gradebook</span>
              </button>
              <button onClick={handleProfileImage} className="btn">
                <span>Update Profile Image</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sessional" style={{ padding: "0 5rem 2rem" }}>
        <StudentProfile currentStudent={currentStudent} />
      </div>
    </Container>
  );
}

export default StudentDashboard;

const Container = styled.div`
  .btn-container1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .btn-container2 {
    display: flex;
    gap: 20px;
  }
  .dashboardContainer {
    height: 100vh;
  }
  .dashboardNavbar {
    width: 100%;
    position: fixed;
    height: 12vh;
    background: #0d6efd;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 1.5em;
    z-index: 1;
  }
  .allBtns {
    background-image: url(${Background});
    overflow-y: auto;
    display: flex;
    gap: 30px;
    height: 100vh;
    align-items: center;
    /* justify-content: center; */
    background-size: cover;
    padding-left: 10rem;
  }
  .btn {
    height: max-content;
    z-index: 0;
    margin-top: 0;
    padding: 20px 40px;
    border: none;
    background: #99ccff;
    color: #fff;
    text-transform: uppercase;
    font-family: "Muli-SemiBold";
    font-size: 15px;
    letter-spacing: 2px;
    transition: all 0.5s;
    position: relative;
    overflow: hidden;
    font-size: 1.5em;
  }
  .btn:active {
    background: #99ccff;
  }
`;
