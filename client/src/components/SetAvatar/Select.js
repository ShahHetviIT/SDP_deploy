import React,{useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


export default function Select() {
    
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!sessionStorage.getItem("user")) {
              //console.log("logon");
              navigate("/login");
            } else {
              
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchData();
      }, [navigate]);
  return (
    <Container>
      <div className="select">
        <button className="submit-btn" onClick={()=>{navigate('/setAvatar')}}>Set Avatar</button>
        <button className="submit-btn" onClick={()=>{navigate('/setProfileImage')}}>Set Profile Picture</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .select {
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: space-around;
    padding: 10px 20px;
    flex-wrap: wrap;
    background-color: #131324;
  }
  .submit-btn {
    margin-top: 0;
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    max-width: 306px;
    &:hover {
      background-color: #4e0eff;
      color: white;
    }
  }
`;
