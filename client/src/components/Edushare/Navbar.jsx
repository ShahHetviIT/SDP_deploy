import '../../style/Navbar.css'
import { Divider } from '@mui/material'
import { FiHome } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { IoArchiveSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SiGoogleclassroom } from "react-icons/si";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";


const Navbar = ({ show,toggleNavbar }) => {
 // const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  useEffect(() => {
    const fetchClassname = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/classroom/getClassroomDetails");
        console.log(response.data);
        setEnrolled(response.data);
      } catch (error) {
        console.error('Error fetching classroom details:', error);
      }
    };

    fetchClassname();
  }, []);
  const navigate = useNavigate();

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <div style={{marginTop: '44px'}}>
        <RxCross1 onClick={toggleNavbar} className='closebtn' style={{marginTop: '20px'}}/>
      <ul>
        <li>
          <Link to='/'>
            <FiHome />
            Home
          </Link>
        </li>
        <li>
          <Link to='Calender'>
            <SlCalender />
            Calender
          </Link>
        </li>
        <Divider className='divider' />
        <div className='title'>Teaching</div>
        <Divider className='divider' />
        <div className='title' >Enrolled</div>
        <li>
          <Link>
            <LuListTodo />To Do
          </Link>
        </li>

        {enrolled.map((classroom, index) => (
            <li key={index} onClick={() => navigate(`/stream/:id`)}>
            <Link>
                <SiGoogleclassroom />{classroom.classname}
            </Link>
            </li>
        ))}


        <Divider className='divider' />
        <li>
          <Link to='/Archived_classes'>
            <IoArchiveSharp />
            Archived classes
          </Link>
        </li>
        <li>
          <Link to='/Setting'>
            <IoSettingsOutline />
            Settings
          </Link>
        </li>
      </ul>


    </div>
    </div>
  )
}

export default Navbar
