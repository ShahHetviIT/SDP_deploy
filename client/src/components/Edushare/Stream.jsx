// import React, { useState, useEffect } from 'react'
// import Avatar from '@mui/material/Avatar';
// import '../Style/Style.css';
// import { Button, TextField } from '@mui/material';
// import Announcement from './Announcement';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// function Stream() {
//   const [selectedClassroom, setSelectedClassroom] = useState(null);
//   const [showInput, setShowInput] = useState(false);
//   const [inputValue, setInput] = useState('');
//   const [file, setFile] = useState('');
//   const [updateMaterials,setUpdateMaterials] = useState([]);
//   const location = useLocation();
//   useEffect(() => {
//     const classroomData = location.state ? location.state.classroomData : null;
//     setSelectedClassroom(classroomData.className);
//     console.log(classroomData.classname);
//     if (classroomData) {
//       setSelectedClassroom(classroomData.classname || '');
//     }
//   }, []);
//   const handleSubmit = async () => {
//     try {
//       const data = JSON.parse(sessionStorage.getItem("classroom-details"));
//       const formData = new FormData();
//       formData.append('title', file.name);
//       formData.append('file', file);
//       formData.append('inputValue', inputValue);
//       formData.append("classname", data.classname);
//       formData.append("classId", data._id);

//       const response = await axios.post(
//         'http://localhost:3001/api/classroom/upload-files',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       console.log('Announcement uploaded',response.data);
//       setShowInput(false);
//         console.log(response.data);
//       setUpdateMaterials([...updateMaterials, response.data]);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };
//   return (
//     <div className='main1'>
//       <div className='main'>
//         <div className='main_wrapper'>
//           <div className='main_content'>
//             <div className='main_wrapper1'>
//               <div className='main_bgImage'>
//                 <div className='main_emptyStyles' />
//               </div>
//               <div className='main_text'>
//                 <h1 className='main_heading main_overflow'>
//                   {selectedClassroom}
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='main_announce'>
//           <div className="main_status">
//             <p>Upcoming</p>
//             <p className='main_subText'>
//               No work due
//             </p>
//           </div>
//           <div className="main_announcements">
//             <div className="main_announcementsWrapper">
//               <div className="main_ancContent">
//                 {showInput ?
//                   <div className="main_form">
//                     <TextField
//                       id='filled-multiline-flexible'
//                       multiline
//                       label='Announce Something To Class'
//                       variant='filled'
//                       value={inputValue}
//                       onChange={(e) => setInput(e.target.value)} />
//                     <div className="main_buttons">
//                       <input variant='outlined' color='primary' type='file' onChange={(e) => setFile(e.target.files[0])} />
//                       <div>
//                         <Button onClick={() => setShowInput(false)}>Cancel</Button>
//                         <Button color='primary' variant='contained' onClick={handleSubmit}>Post</Button>
//                       </div></div>
//                   </div> : (
//                     <div className='main_wrapper3' onClick={() => setShowInput(true)}>
//                       <Avatar />
//                       <div>Announce Something to Class</div>
//                     </div>
//                   )}

//               </div>
//             </div>
//             <Announcement updateMaterials={updateMaterials}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Stream;


import React, { useState, useEffect } from 'react';
import '../../style/Stream.css';
import { AppBar, Button, Dialog, DialogActions, DialogContent, TextField, Toolbar, Typography } from '@mui/material';
import Announcement from './Announcement';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Stream() {
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState('');
  const [file, setFile] = useState('');
  const [updateMaterials, setUpdateMaterials] = useState([]);
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [role, setRole] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentImageType, setCurrentImageType] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("user"));
        setRole(data.role);
        console.log(data);
        if (data.isAvatarImageSet) {
          console.log("avatar");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
          setCurrentImageType("avatar");
        } else {
          console.log("profile");
          setCurrentUserName(data.username);
          setCurrentUserImage(data.profileImage);
          setCurrentImageType("profile");
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  useEffect(() => {
    const classroomData = location.state ? location.state.classroomData : null;
    if (classroomData) {
      setSelectedClassroom(classroomData.classname || '');
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(sessionStorage.getItem("classroom-details"));
      const formData = new FormData();
      formData.append('title', file.name);
      formData.append('file', file);
      formData.append('inputValue', inputValue);
      formData.append("classname", data.classname);
      formData.append("classId", data._id);

      const response = await axios.post(
        'http://localhost:3001/api/classroom/upload-files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Announcement uploaded', response.data);
      setShowInput(false);
      setUpdateMaterials([...updateMaterials, response.data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='main1'>
      <AppBar position="static" style={{position:'fixed', width:'100%', zIndex:'1'}}>
        <Toolbar className='header2'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} margin='15px' fontSize='2em'>
            {selectedClassroom}
          </Typography>
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
          </div>
        </Toolbar>
      </AppBar>
      <div className='main'>
        <div className='main_wrapper'>
        </div>
        <div className='main_announce'>
          <div className="main_announcements">
            <div className="main_announcementsWrapper">
              <div className="main_ancContent">
                {role === "teacher" && <div className='announmentButton' style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#333',
                  fontSize: '16px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  transition: 'color 0.3s, background-color 0.3s',
                  
                }} onClick={() => setOpenDialog(true)}><span style={{color: '#1967d2', fontSize:'20px'}}>Announce Something to Class</span></div>}
                {role === "student" && <h1 style={{color:'#1967d2'}}>Relish Learning</h1>}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
                  <DialogContent>
                    <TextField
                      id='filled-multiline-flexible'
                      multiline
                      label='Announce Something To Class'
                      variant='filled'
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <input className='btnfile'
                      variant='outlined'
                      color='primary'
                      type='file'
                      margin='10px'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} style={{width: '100px'}}>Cancel</Button>
                    <Button color='primary' variant='contained' onClick={handleSubmit} style={{width: '100px'}}>Post</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <Announcement updateMaterials={updateMaterials} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stream;
