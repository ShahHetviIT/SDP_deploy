import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios";
import {uploadFilesMessages} from "../../utils/APIRoutes";
// import getSocket from "../components/ChatContainer";

export default function ChatInput({ handleSendMsg, currentChat, getSocket }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [files, setFiles] = useState("");

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const fileInputRef = React.createRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const sendFile = async (e) => {
    e.preventDefault();
    // Using spread syntax to create a new array with the selected files
    const selectedFiles = [...e.target.files];
    const data = await JSON.parse(sessionStorage.getItem("user"));
    const formData = new FormData();
    console.log(selectedFiles[0].name);
    formData.append("title", selectedFiles[0].name);
    formData.append("file", selectedFiles[0]);
    formData.append("from", data.userId); // Assuming data.userId is the 'from' value
    formData.append("to", currentChat._id);

    console.log(formData);

    // handleSendMsg(formData);

    const result = await axios.post(
      uploadFilesMessages,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    const fileName = selectedFiles[0].name;

    getSocket(fileName,selectedFiles[0].name)

    
    // console.log("bedore");
   
    // console.log("after");
  };

  // useEffect(() => {
  //   getPdf();
  // }, []);

  // // Correct
  // const getPdf = async () => {
  //   const result = await axios.get(
  //     "http://localhost:3001/api/messages/get-files"
  //   );
  //   console.log(result.data.data);
  //   setFiles((prevFiles) => [...prevFiles, ...result.data.data]);
  // };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <div>
        <button
          className="attachmentButton"
          aria-label="Attach File"
          onClick={handleButtonClick}
        >
          <i className="fa-solid fa-paperclip fa-xl"></i>
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          onChange={sendFile}
          style={{ display: "none" }}
          multiple
        />
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      {/* <div>
        <input type="file" onChange={sendFile}/>
      </div> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  // grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  button {
    margin: 0;
  }
  .emoji-picker-react .emoji.has-skin-variation button:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    right: -2px;
    bottom: 0px;
    position: absolute;
    border-left: 0px solid transparent;
    border-right: 0 solid transparent;
    border-bottom: 0px solid rgba(0, 0, 0, 0.1);
    transform: rotate(135deg);
    z-index: 1;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji {
          button {
            width: max-content;
            height: max-content;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
            margin: 0;
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          height: 37.7px;
          color: white;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    padding: 0;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      margin: 0;
      width: max-content;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  .attachmentButton {
    background: transparent;
  }
  .attachmentButton:hover {
    background: none;
  }
  .attachmentButton:before,
  .attachmentButton:after {
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

  .attachmentButton:after {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
  }

  .attachmentButton:hover:before,
  .attachmentButton:hover:after {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
`;
