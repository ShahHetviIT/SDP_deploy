import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
        if (user) {
            console.log(user.username);
            setUserName(user.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  h1{
    font-size: 2em;
    letter-spacing: 0.5px;
    font-weight: bold;
  }
  h3{
    color: white;
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    letter-spacing: 0.5px;
    text-transform: none;
    padding: 0;
    margin: 10px 0;
    font-weight: bold;
    font-family: 'Muli-Regular';
  }
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
