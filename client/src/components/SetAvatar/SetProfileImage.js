import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setProfileImageRoute,host } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SetProfileImage() {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem("user")) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", user.userId);
      formData.append("role", user.role);

      try {
        const response = await axios.post(setProfileImageRoute, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImageURL(response.data.profileImage);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUpload = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    user.isProfileImageSet = true;
    user.profileImage = imageURL;
    sessionStorage.setItem(
        "user",
        JSON.stringify(user)
      );
      if(user.role==='teacher'){
        navigate("/teacherDashboard");
      }else{
        navigate("/studentDashboard");
      }
  };

  return (
    <Container>
      <div className="file-input">
        {imageURL && (
          <div className="uploaded-image">
            <img
              className="image"
              src={`${host}/files/${imageURL}`}
              alt="Uploaded Profile"
            />
          </div>
        )}
        <div className="btn-container">
          <div className="file-input-container">
            <label htmlFor="file-upload">Choose an image</label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="file-input-container">
            <button onClick={handleUpload}>Upload Image</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .file-input {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }

  .file-input-container {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .file-input-container input[type="file"] {
    position: absolute;
    font-size: 100px;
    opacity: 0;
    right: 0;
    top: 0;
  }

  .file-input-container label {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    display: inline-block;
  }

  .image {
    border-radius: 50%;
    height: 300px;
    width: 300px;
  }
`;
