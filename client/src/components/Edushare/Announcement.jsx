// // // import React, { useEffect, useState } from 'react'
// // // import Avatar from '@mui/material/Avatar';
// // // import '../Style/Announcement.css'
// // // const Announcement = ({allImage}) => {
// // //     if(!allImage || allImage.lenght==0){
// // //       return <div>No announcement</div>
// // //     }
// // //   const sortedAnnouncement = allImage.sort((a,b)=> new Date(b.Date)-new Date(a.Date));

// // //   return (
// // //     <div>
// // //         <div className="amt">
// // //          {sortedAnnouncement.map((announcement)=>(
// // //           <div className="amt__Cnt">
// // //             <div className="amt__top">
// // //               <Avatar />

// // //               <div className='amt_content'>

// // //               </div>
// // //             </div>

// // //           </div>
// // //          ))}
// // //         </div>
// // //     </div>
// // //   )
// // // }
// // import React, { useEffect, useState } from 'react';
// // import Avatar from '@mui/material/Avatar';
// // import axios from 'axios';

// // const Announcement = ({materials}) => {
// //   if (!materials || materials.length === 0) {
// //     return <div>No announcements</div>;
// //   }
// //   const [material, setMaterial] = useState([]);

// //   const getPdf = async () => {
// //     try {
// //       const details = JSON.parse(sessionStorage.getItem("classroom-details"));
// //       const userId = details._id;
// //       const result = await axios.get(`http://localhost:3001/api/classroom/get-files/${userId}`);
// //       setMaterial(result.data.data); // Update to set the entire array
// //       console.log(material);
// //     } catch (error) {
// //       console.error("Error fetching PDF files:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     getPdf();
// //   }, []); // Empty dependency array to run only once when the component mounts

// //   const showPdf = (pdf) => {
// //     window.open(`http://localhost:3001/files/${pdf}`, "blank", "noreference");
// //   };

// //   return (
// //     <div>
// //       <div className="amt">
// //         <div className="amt__Cnt">
// //           {materials.map((file, index) => (
// //             <div key={index} className="amt__top">
// //               <Avatar />
// //               <div>{file.pdfName}</div>
// //               <div>{new Date(file.createdAt).toLocaleDateString()}</div>
// //               <button onClick={() => showPdf(file.pdf)}>View PDF</button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>

// //   );
// // }
// // export default Announcement;

//  import React, { useEffect, useState } from 'react';
//  import Avatar from '@mui/material/Avatar';
//  import axios from 'axios';

// const Announcement = ({ }) => {
//   const [material, setMaterial] = useState([]);
//   useEffect(() => {
//     const getPdf = async () => {
//       try {
//         const details = JSON.parse(sessionStorage.getItem("classroom-details"));
//         const userId = details._id;
//         const result = await axios.get(`http://localhost:3001/api/classroom/get-files/${userId}`);
//         setMaterial(result.data.data);
//       } catch (error) {
//         console.error("Error fetching PDF files:", error);
//       }
//     };

//     getPdf();
//   }, []);

//   const showPdf = (pdf) => {
//     window.open(`http://localhost:3001/files/${pdf}`, "blank", "noreference");
//   };

//   return (
//     <div>
//       <div className="amt">
//         <div className="amt__Cnt">
//           {material.map((file, index) => (
//             <div key={index} className="amt__top">
//               <Avatar />
//               <div>{file.pdfName}</div>
//               <div>{new Date(file.createdAt).toLocaleDateString()}</div>
//               <button onClick={() => showPdf(file.pdf)}>View PDF</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Announcement;

import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import '../../style/Announcement.css';
import { Divider } from '@mui/material';

const Announcement = ({ updateMaterials }) => {
  const [material, setMaterial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (material.length > 0) {
      setLoading(false);
    }
  }, [material]);
  const getPdf = async () => {
    try {
      const details = JSON.parse(sessionStorage.getItem("classroom-details"));
      const userId = details._id;
      const result = await axios.get(`http://localhost:3001/api/classroom/get-files/${userId}`);
      setMaterial(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  useEffect(() => {
    getPdf();
  }, [updateMaterials]); // Run the effect whenever updateMaterials changes

  const showPdf = (pdfUrl, description) => {
    window.open(`http://localhost:3001/files/${pdfUrl}`, "blank", "noreference");
    console.log(description);
  };

  return (
    <div>
      {material.map((item, index) => (
  <div key={index} className='amt'>
    {item.pdf.length === 0 ? (
      <div className='no-announcements'>No materials available</div>
    ) : (
      item.pdf.map((pdfName, pdfIndex) => (
        <div key={pdfIndex} className="amt__Cnt">
          <div className='date'>{new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="amt__top">
            <div>
              <div>{item.pdfName[pdfIndex]}</div>
              <div>{item.description[pdfIndex]}</div>
            </div>
            <button onClick={() => showPdf(pdfName, item.description)}><span>View PDF</span></button>
          </div>
          <Divider />
        </div>
      ))
    )}
  </div>
))}

  

    </div>
  );
};

export default Announcement;

