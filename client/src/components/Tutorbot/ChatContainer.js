import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "../Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        setRole(data.role);
        const response = await axios.post(recieveMessageRoute, {
          from: data.userId,
          to: currentChat._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData(); // Call the async function
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(sessionStorage.getItem("user")).userId;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // const handleSendMsg = async (msg) => {
  //   const data = await JSON.parse(
  //     sessionStorage.getItem("user")
  //   );
  //   socket.current.emit("send-msg", {
  //     to: currentChat._id,
  //     from: data.userId,
  //     msg,
  //   });
  //   await axios.post(sendMessageRoute, {
  //     from: data.userId,
  //     to: currentChat._id,
  //     message: msg,
  //   });

  //   const msgs = [...messages];
  //   msgs.push({ fromSelf: true, message: msg });
  //   setMessages(msgs);
  // };

  const getSocket = async (msg, title) => {
    console.log(msg);
    const data = await JSON.parse(sessionStorage.getItem("user"));
    try {
      setMessages((prevState) => [
        ...prevState,
        { fromSelf: true, message: msg },
      ]);
      if (socket.current && socket.current.connected) {
        console.log("msg send");
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: data.userId,
          msg,
        });
      }
      getPdf();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  // Correct
  const getPdf = async () => {
    const result = await axios.get(
      "http://localhost:3001/api/messages/get-files"
    );
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const showPdf = (pdf) => {
    console.log(pdf);
    window.open(`http://localhost:3001/files/${pdf}`, "_blank", "noreferrer");
  };

  const handleSendMsg = async (msg) => {
    try {
      // const data = await JSON.parse(sessionStorage.getItem("user"));

      // Update state using prevState to ensure correctness

      getSocket(msg, null);
    } catch (error) {
      console.error("Error preparing message:", error);
    }

    try {
      const data = await JSON.parse(sessionStorage.getItem("user"));
      await axios.post(sendMessageRoute, {
        from: data.userId,
        to: currentChat._id,
        message: msg,
      });

      // console.log(result);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        // Check if the message is a string
        if (typeof msg === "string") {
          setArrivalMessage({ fromSelf: false, message: msg });
        } else {
          console.error("Received malformed message:", msg);
        }
      });

      // Handle potential error events
      socket.current.on("error", (error) => {
        console.error("Socket error:", error);
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    getPdf();
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              {/* <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div> */}
              {currentChat.isAvatarImageSet && (
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt=""
                  />
                </div>
              )}
              {currentChat.isProfileImageSet && (
                <div className="avatar">
                  <img
                    className="userProfile"
                    src={`http://localhost:3001/files/${currentChat.profileImage}`}
                    alt="avatar"
                  />
                </div>
              )}
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <div className="dashboard-link">
              <div>
                {role === "teacher" && (
                  <Link to="/teacherDashboard">Dashboard</Link>
                )}
                {role === "student" && (
                  <Link to="/studentDashboard">Dashboard</Link>
                )}
              </div>
              <Logout />
            </div>
          </div>
          <div className="chat-messages">
            {messages.length > 0 ? (
              messages.map((message) => {
                const isFileAttachment = /\.(pdf|jpg|png|docx|txt|zip)$/i.test(
                  message.message
                );

                let imageData = null;
                let imagename = null;
                // Find the matching data in allImage
                allImage.forEach((image) => {
                  if (message.message === image.message.text) {
                    imageData = image.pdf;
                    imagename = image.message.text;
                  }
                });

                console.log(imageData + "----" + imagename);

                return (
                  <div ref={scrollRef} key={uuidv4()}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sended" : "recieved"
                      } ${isFileAttachment ? "file-attachment" : ""}`}
                    >
                      <div className="content">
                        {isFileAttachment ? (
                          <div className="specialMsg">
                            <p>{message.message}</p>
                            <button
                              className="showBtn"
                              onClick={() => showPdf(imageData)}
                            >
                              <i className="fa-regular fa-file"></i>
                            </button>
                            {/* Additional content related to imageData can be displayed here */}
                          </div>
                        ) : (
                          <p>{message.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          <ChatInput
            handleSendMsg={handleSendMsg}
            currentChat={currentChat}
            getSocket={getSocket}
          />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;

  .dashboard-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    a {
      font-size: large;
      color: white;
    }
    a:hover {
      color: #99ccff;
    }
  }
  .specialMsg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .showBtn {
    margin: 0;
    height: auto;
    border-radius: 5px;
    padding: 10px;
    width: auto;
    i {
      color: black;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2.8rem;
          width: 2.8rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
          text-transform: none;
          letter-spacing: 0.5px;
          margin-bottom: 0px;
          font-size: 1.17em;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff;
      }
    }
  }
`;
