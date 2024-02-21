import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { fetchData } from './Classcard';
import { useNavigate } from 'react-router-dom';
import {addClassroomDetailsRoute} from "../../utils/APIRoutes";


export default function Createroom() {
  const [open, setOpen] = useState(false);
  const [classRoom, setClassRoom] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [role, setRole] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/login");
    } else {
      const data = JSON.parse(sessionStorage.getItem("user"));
      setRole(data.role);
    }
  }, [navigate]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(classRoom);
    console.log(subject);
    console.log(teacher);

    try {
      
      const result = await axios.post(addClassroomDetailsRoute, {
        classRoom,
        subject,
        teacher,
      });

      console.log(result.data.msg);
      fetchData();
      // if(result){
      //   navigate("/classcard");
      // }
    } catch (ex) {
      console.log(ex);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      {role === "teacher" && <FaPlus className="plus"  style={{ cursor: 'pointer' }} onClick={handleClickOpen} />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Class</DialogTitle>
        <DialogContent>
          <form style={{ boxShadow: 'none', padding: 0 }} onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="classRoom"
              label="Create Class"
              type="text"
              autoComplete='off'
              fullWidth
              variant="standard"
              value={classRoom}
              onChange={(e) => { setClassRoom(e.target.value); }}

            />
            <TextField
              autoFocus
              margin="dense"
              id="subject"
              label="Subject"
              type="text"
              fullWidth
              variant="standard"
              autoComplete='off'
              value={subject}
              onChange={(e) => { setSubject(e.target.value); }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="teacher"
              label="Teacher Name"
              type="text"
              fullWidth
              variant="standard"
              autoComplete='off'
              value={teacher}
              onChange={(e) => { setTeacher(e.target.value); }}
              required
            />
            <DialogActions>
              <Button onClick={handleClose} >Cancel</Button>
              <Button type="submit" style={{backgroundColor: '#007bff', color: 'white'}}><span>Create</span></Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
