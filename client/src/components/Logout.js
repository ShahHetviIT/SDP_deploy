import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
// import axios from "axios";
// import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    sessionStorage.clear();
      navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <span><BiPowerOff /></span>
    </Button>
  );
}

const Button = styled.button`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    /* background-color: rgb(154, 134, 243); */
    border: none;
    cursor: pointer;
    margin: 0;
    width: max-content;
    height: max-content;
    background-color: #accffe;
  svg {
    font-size: 1.3rem;
    // color: #ebe7ff;
    color: black;
  }
`;
