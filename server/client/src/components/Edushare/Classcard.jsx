// // Classcard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from '@mui/material/Card';
// import { useNavigate } from 'react-router-dom';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { SiProtondrive } from "react-icons/si";
// import { BsPersonWorkspace } from "react-icons/bs";
// import '.././Style/Classcard.css';
// import { Divider } from '@mui/material';
// import Navbar from '../Component/Navbar';
// import data from '../data';
// export const callFetchData = async () => {
//   console.log("callFetchData");
//   await Classcard.fetchData();
// }

// export default function Classcard() {
//   const navigate = useNavigate();
//   const [classroomDetails, setClassroomDetails] = useState([]);
//   const [selectedClassroom, setSelectedClassroom] = useState(null);

//   const fetchData = async () => {
//     console.log("fetchData");
//     try {
//       const response = await axios.post("http://localhost:3001/api/classroom/getClassroomDetails");
//       console.log(response.data);
//       setClassroomDetails(response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching classroom details:', error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleClick = (classroomData) => {
//     const classroomDataJson = JSON.stringify(classroomData); // Convert to JSON
//     sessionStorage.setItem("classroom-details", classroomDataJson);
//     console.log(classroomData.classname);
//     setSelectedClassroom(classroomData);
//     navigate(`/stream/:id`, { state: { classroomData } });
//   }
// //   const randomImage =
// //     data[Math.floor(Math.random() * data.length)];
// //   console.log(randomImage.path);
// //   return (
// //     <>
// //       {classroomDetails.map((classroom, index) => (
// //         <Card key={index} sx={{ width: 345 }} className='card' onClick={() => handleClick(classroom)}>
// //           <CardMedia
// //             className='media'
// //             sx={{ height: 140 }}
// //             image={require('../Classcard/' + randomImage.name)}
// //             title="Subject"
// //             alt='unsplash image'
// //           />
// //           <Divider />
// //           <CardContent>
// //             <Typography gutterBottom variant="h5" component="div">
// //               {classroom.classname}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary">
// //               Batch: H ans I
// //             </Typography>
// //           </CardContent>
// //           <Divider />
// //           <CardActions className='action'>
// //             <BsPersonWorkspace className='work' />
// //             <SiProtondrive className='drive' />
// //           </CardActions>
// //         </Card>

// //       ))}
// //     </>
// //   );
// // }
// return (
//   <>
//     {classroomDetails.map((classroom, index) => {
//       const randomImage = data[Math.floor(Math.random() * data.length)];

//       return (
//         <Card key={index} sx={{ width: 345 }} className='card' onClick={() => handleClick(classroom)}>
//           <CardMedia
//             className='media'
//             sx={{ height: 140 }}
//             image={require('../Classcard/' + randomImage.name)}
//             title="Subject"
//             alt='unsplash image'
//           />
//           <Divider />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {classroom.classname}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Batch: H ans I
//             </Typography>
//           </CardContent>
//           <Divider />
//           <CardActions className='action'>
//             <BsPersonWorkspace className='work' />
//             <SiProtondrive className='drive' />
//           </CardActions>
//         </Card>
//       );
//     })}
//   </>
// );
// }

// Classcard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { SiProtondrive } from "react-icons/si";
import { BsPersonWorkspace } from "react-icons/bs";
import '../../style/Classcard.css';
import { Divider } from '@mui/material';
import data from '../../data/data';
import {getClassroomDetailsRoute} from "../../utils/APIRoutes"

export const fetchData = async () => {
  console.log("fetchData");
  try {
    const response = await axios.post(getClassroomDetailsRoute);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching classroom details:', error);
    return [];
  }
};

export default function Classcard() {
  const navigate = useNavigate();
  const [classroomDetails, setClassroomDetails] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  useEffect(() => {
    fetchData().then(data => setClassroomDetails(data));
  }, []);

  const handleClick = (classroomData) => {
    const classroomDataJson = JSON.stringify(classroomData); // Convert to JSON
    sessionStorage.setItem("classroom-details", classroomDataJson);
    console.log(classroomData.classname);
    setSelectedClassroom(classroomData);
    navigate(`/stream/:id`, { state: { classroomData } });
  }

  return (
    <>
      {classroomDetails.map((classroom, index) => {
        const randomImage = data[Math.floor(Math.random() * data.length)];

        return (

          <Card key={index} sx={{ width: 345 }} className='card' onClick={() => handleClick(classroom)}>

            <CardMedia
              className='media'
              sx={{ height: 140 }}
              image={require('../../Classcard/' + randomImage.name)}
              title="Subject"
              alt='unsplash image'
            />
            <Divider />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {classroom.classname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Batch: H ans I
              </Typography>
            </CardContent>
            <Divider />
            <CardActions className='action'>
              <div className='work'>
                <BsPersonWorkspace />
                <a href="https://www.google.com/intl/en_in/drive/">
                  <SiProtondrive className='drive'/>
                </a>
              </div>
            </CardActions>
          </Card>

        );
      })}
    </>
  );
}
