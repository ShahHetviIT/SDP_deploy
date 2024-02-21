import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Contacts from "./Contacts";
import {
  allUsersRouteTeachers,
  allUsersRouteStudents,
  host,
} from "../../utils/APIRoutes";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
// import { getAllUsersStudents } from "../../../server/controllers/loginController";

const Chatbox = () => {
  const navigate = useNavigate();
  const [teacherContacts, setTeacherContacts] = useState([]);
  const [studentContacts, setStudentContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem("user")) {
          //console.log("logon");
          navigate("/login");
        } else {
          setCurrentUser(await JSON.parse(sessionStorage.getItem("user")));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          
          if (currentUser.isAvatarImageSet || currentUser.isProfileImageSet) {
            const teacherdata = await axios.get(
              `${allUsersRouteTeachers}/${currentUser.userId}`
            );
            setTeacherContacts(teacherdata.data);
            console.log(teacherdata.data);
  
            const studentData = await axios.get(
              `${allUsersRouteStudents}/${currentUser.userId}`
            );
            setStudentContacts(studentData.data);
            console.log(studentData.data);
          } else {
            navigate("/select");
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          teacherContacts={teacherContacts}
          studentContacts={studentContacts}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    padding: 0;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 35% 65%;
    }
  }
};`;

export default Chatbox;
