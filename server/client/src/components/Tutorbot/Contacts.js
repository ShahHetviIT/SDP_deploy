// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Logo from "../assets/icon1.png";

// export default function Contacts({ teacherContacts, studentContacts, changeChat }) {
//   const [currentUserName, setCurrentUserName] = useState(undefined);
//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
//   const [currentSelected, setCurrentSelected] = useState(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await JSON.parse(sessionStorage.getItem("user"));
//         setCurrentUserName(data.username);
//         setCurrentUserImage(data.avatarImage);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []); // The empty dependency array means this effect runs once after the initial render

//   const changeCurrentChat = (index, contact) => {
//     setCurrentSelected(index);
//     changeChat(contact);
//     console.log(index);
//     console.log(contact);
//   };

//   return (
//     <>
//       {currentUserImage && currentUserImage && (
//         <Container>
//           <div className="brand">
//             <img src={Logo} alt="logo" />
//             <h3>Mentor Mingle</h3>
//           </div>
//           <div className="contacts">
//             {teacherContacts.map((contact, index) => {
//               return (
//                 <div
//                   key={contact._id}
//                   className={`contact ${
//                     index === currentSelected ? "selected" : ""
//                   }`}
//                   onClick={() => changeCurrentChat(index, contact)}
//                 >
//                   <div className="avatar">
//                     <img
//                       src={`data:image/svg+xml;base64,${contact.avatarImage}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="username">
//                     <h3>{contact.username}</h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="current-user">
//             <div className="avatar">
//               <img
//                 src={`data:image/svg+xml;base64,${currentUserImage}`}
//                 alt="avatar"
//               />
//             </div>
//             <div className="username">
//               <h2>{currentUserName}</h2>
//             </div>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 75% 15%;
//   overflow: hidden;
//   background-color: #080420;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 2rem;
//     }
//     h3 {
//       color: white;
//       text-transform: uppercase;
//       margin-bottom: 0px;
//       letter-spacing: 1px;
//       font-size: 1.5em;
//       font-weight: bold;
//     }
//   }
//   .contacts {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     gap: 0.8rem;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .contact {
//       background-color: #ffffff34;
//       min-height: 5rem;
//       cursor: pointer;
//       width: 90%;
//       border-radius: 0.2rem;
//       padding: 0.4rem;
//       display: flex;
//       gap: 1rem;
//       align-items: center;
//       transition: 0.5s ease-in-out;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//           margin-bottom: 0;
//           text-transform: none;
//           letter-spacing: 0.5px;
//           font-size: 1.3em;
//         }
//       }
//     }
//     .selected {
//       // background-color: #9a86f3;
//       background-color: #accffe;
//       .username{
//         h3{
//           color: black;
//         }
//       }
//     }
//   }

//   .current-user {
//     background-color: #0d0d30;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 2rem;
//     .avatar {
//       img {
//         height: 4rem;
//         max-inline-size: 100%;
//       }
//     }
//     .username {
//       h2 {
//         color: white;
//         font-size: 1.5em;
//         font-weight: bold;
//         letter-spacing: 1px;
//       }
//     }
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       gap: 0.5rem;
//       .username {
//         h2 {
//           font-size: 1rem;
//         }
//       }
//     }
//   }
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TutorBot from "../../assets/totorbot.png";
import {host} from "../../utils/APIRoutes";

export default function Contacts({
  teacherContacts,
  studentContacts,
  changeChat,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [teacherDivOpen, setTeacherDivOpen] = useState(false);
  const [studentDivOpen, setStudentDivOpen] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        setCurrentUserName(data.username);
        if (data.isAvatarImageSet) setCurrentUserImage(data.avatarImage);
        else setCurrentUserProfile(data.profileImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    console.log(index);
    console.log(contact);
  };

  const toggleTeacherDiv = () => {
    setTeacherDivOpen(!teacherDivOpen);
    setStudentDivOpen(false); // Close student contacts
    setCurrentSelected(undefined);
  };

  const toggleStudentDiv = () => {
    setStudentDivOpen(!studentDivOpen);
    setTeacherDivOpen(false);
    setCurrentSelected(undefined); // Close teacher contacts
  };

  return (
    <>
      {(currentUserImage ||
        currentUserProfile) && (
          <Container>
            <div className="brand">
              <img src={TutorBot} alt="logo" />
              <h3>Mentor Mingle</h3>
            </div>
            <div className="contacts">
              <div className="contactsList">
                <button
                  className="teachersOpenButton"
                  onClick={toggleTeacherDiv}
                >
                  <div>Teachers</div>
                  <div>
                    <i
                      className={`fa-solid fa-caret-${
                        teacherDivOpen ? "up" : "down"
                      }`}
                    ></i>
                  </div>
                </button>
              </div>
              {teacherDivOpen && (
                <>
                  {teacherContacts.map((contact, index) => (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      {contact.isAvatarImageSet && (
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar"
                          />
                        </div>
                      )}
                      {contact.isProfileImageSet && (
                        <div className="avatar">
                          <img
                            className="userProfile"
                            src={`${host}/files/${contact.profileImage}`}
                            alt="avatar"
                          />
                        </div>
                      )}
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div className="contactsList">
                <button
                  className="studentsOpenButton"
                  onClick={toggleStudentDiv}
                >
                  <div>Students</div>
                  <div>
                    <i
                      className={`fa-solid fa-caret-${
                        studentDivOpen ? "up" : "down"
                      }`}
                    ></i>
                  </div>
                </button>
              </div>

              {studentDivOpen && (
                <>
                  {studentContacts.map((contact, index) => (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      {contact.isAvatarImageSet && (
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar"
                          />
                        </div>
                      )}
                      {contact.isProfileImageSet && (
                        <div className="avatar">
                          <img
                            className="userProfile"
                            src={`${host}/files/${contact.profileImage}`}
                            alt="avatar"
                          />
                        </div>
                      )}
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="current-user">
              {currentUserImage && (
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                    alt="avatar"
                  />
                </div>
              )}

              {currentUserProfile && (
                <div className="avatar">
                  <img
                    className="userProfile"
                    src={`${host}/files/${currentUserProfile}`}
                    alt="avatar"
                  />
                </div>
              )}

              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .userProfile {
    border-radius: 50%;
  }

  .contactsList {
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    /* padding: 0.4rem; */
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
  }
  .teachersOpenButton,
  .studentsOpenButton {
    margin: 0;
  }

  .teachersOpenButton,
  .studentsOpenButton {
    background: #9900ff;
    gap: 1rem;
  }

  .teachersOpenButton:before,
  .teachersOpenButton:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: transparent;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
    -webkit-transform: none;
    transform: none;
    -webkit-transition-timing-function: none;
    transition-timing-function: none;
  }

  .teachersOpenButton:after {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }

  .teachersOpenButton:hover:before,
  .teachersOpenButton:hover:after {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  .studentsOpenButton:before,
  .studentsOpenButton:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: transparent;
    -webkit-transition: none;
    -moz-transition: none;
    -o-transition: none;
    transition: none;
    -webkit-transform: none;
    transform: none;
    -webkit-transition-timing-function: none;
    transition-timing-function: none;
  }

  .studentsOpenButton:after {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }

  .studentsOpenButton:hover:before,
  .studentsOpenButton:hover:after {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    justify-content: center;
    img {
      height: 2.8rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      margin-bottom: 0px;
      letter-spacing: 1px;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transform-origin: center top; /* Set the transform origin to the top */
      transition: transform 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          width: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          margin-bottom: 0;
          text-transform: none;
          letter-spacing: 0.5px;
          font-size: 1.3em;
        }
      }
    }
    .contact:hover {
      transform: translateX(
        -5px
      ); /* Adjust the value based on your preference */
    }
    .selected {
      // background-color: #9a86f3;
      background-color: #accffe;
      .username {
        h3 {
          color: black;
        }
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        width: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        font-size: 1.5em;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
