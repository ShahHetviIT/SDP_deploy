import React, { useState, useEffect } from "react";
import {
  marksAttendanceRoute,
  getMarksAttendanceRoute,
  getTotalMarksAttendanceRoute,
} from "../../../utils/APIRoutes";
import axios from "axios";
// import Total from "./Total";

export default function Sessional3({
  studentContacts,
  teacherLecture,
  teacherLab,
}) {

  const initialTotalState = () => {
    const lectureTotal = teacherLecture.reduce((acc, lecture) => {
      acc[lecture] = { totalMarks: "", totalAttendance: "", type: "lecture" };
      return acc;
    }, {});
    const labTotal = teacherLab.reduce((acc, lab) => {
      acc[lab] = { totalAttendance: "", type: "lab" };
      return acc;
    }, {});
    return { ...lectureTotal, ...labTotal };
    
  };

  const [marks, setMarks] = useState([]);
  const [total, setTotal] = useState(initialTotalState);

  const handleTotalChange = (subject, type, value,typeOf) => {

    setTotal((prevTotal) => ({
      ...prevTotal,
      [subject]: {
        ...prevTotal[subject],
         // Ensure the type property is explicitly set
        [type]: value,
        type: typeOf,
      },
    }));
    // console.log(total);
  };
  
  

  // Initialize marks state when component mounts
  useEffect(() => {
    const sessional = "sessional3";
    const fetchMarksAttendance = async () => {
      try {
        // console.log(studentContacts);
        // Fetch marks and attendance data from the server
        const response = await axios.post(getMarksAttendanceRoute, {
          studentContacts,sessional
        });

        // Map the fetched data to update the marks state
        const updatedMarks = studentContacts.map((student) => {
          const studentMarks = {};
          teacherLecture.forEach((lecture) => {
            studentMarks[lecture] = {
              marks: response.data[student._id]?.marksLecture[lecture] || "",
              attendance:
                response.data[student._id]?.attendanceLecture[lecture] || "",
              type: "lecture",
            };
          });
          teacherLab.forEach((lab) => {
            studentMarks[lab] = {
              attendance: response.data[student._id]?.attendanceLab[lab] || "",
              type: "lab",
            };
          });
          return {
            _id: student._id,
            name: student.username,
            marks: studentMarks,
          };
        });
        // console.log(updatedMarks);

        // Set the updated marks state
        setMarks(updatedMarks);

        const response1 = await axios.post(getTotalMarksAttendanceRoute, {
          studentContacts,sessional
        });

        const { totalExamMarks, totalAttendanceLecture, totalAttendanceLab } =
          response1.data;

          const updatedTotal = {};

          // Compare and assign values for lecture subjects
          teacherLecture.forEach((lecture) => {
            if (totalExamMarks.hasOwnProperty(lecture)) {
              updatedTotal[lecture] = {
                totalMarks: totalExamMarks[lecture][0] || "",
                totalAttendance: totalAttendanceLecture[lecture][0] || ""
              };
            }
          });
          
          // Compare and assign values for lab subjects
          teacherLab.forEach((lab) => {
            if (totalAttendanceLab.hasOwnProperty(lab)) {
              updatedTotal[lab] = {
                totalAttendance: totalAttendanceLab[lab][0] || ""
              };
            }
          });
          

        // console.log(updatedTotal);

        setTotal(updatedTotal);
        // console.log(total);
      } catch (error) {
        console.log("Error fetching marks and attendance:", error);
      }
    };

    // Call the fetchMarksAttendance function
    fetchMarksAttendance();
  }, [studentContacts, teacherLecture, teacherLab]);

  // Function to handle changes in marks
  const handleMarksChange = (studentIndex, subject, type, value) => {
    setMarks((prevMarks) => {
      const newMarks = [...prevMarks];
      newMarks[studentIndex].marks[subject][type] = value;
      return newMarks;
    });
  };

  // Function to handle saving marks
  const handleSave = async (event) => {
    // console.log(total);
    // Here you can do whatever you want with the marks array, like sending it to the server
    // console.log("Saved marks:", marks);

    try {
      const sessional = "sessional3";
      const result = await axios.post(marksAttendanceRoute, { marks, total, sessional});

      if (result.data.success) {
        console.log("Marks inserted Successfully");
      } else {
        console.log("Marks not inserted");
      }
    } catch (error) {
      console.log("error : " + error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={teacherLecture.length * 2 + teacherLab.length + 2}>
              Sessional 3
            </th>
          </tr>
          <tr>
            <th rowSpan="3">Roll No.</th>
            <th rowSpan="3">Students Name</th>
          </tr>
          <tr>
            <th colSpan={teacherLecture.length * 2}>Lectures</th>
            <th colSpan={teacherLab.length}>Labs</th>
          </tr>
          <tr>
            {teacherLecture.map((lecture, index) => (
              <React.Fragment key={index}>
                <th>
                  {lecture}
                  <br />
                  (Marks)
                </th>
                <th>
                  {lecture}
                  <br />
                  (Attendance)
                </th>
              </React.Fragment>
            ))}
            {teacherLab.map((lab, index) => (
              <th key={index}>
                {lab}
                <br />
                (Attendance)
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentContacts.map((student, index) => (
            <tr key={student._id}>
              <td>{student.rollNo}</td>
              <td className="studentName">{student.username}</td>
              {teacherLecture.map((lecture, lectureIndex) => (
                <React.Fragment key={lectureIndex}>
                  <td>
                    <input
                      type="number"
                      placeholder="-"
                      className="inp"
                      value={marks[index]?.marks[lecture].marks || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          index,
                          lecture,
                          "marks",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="-"
                      className="inp"
                      value={marks[index]?.marks[lecture].attendance || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          index,
                          lecture,
                          "attendance",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </React.Fragment>
              ))}
              {teacherLab.map((lab, labIndex) => (
                <td key={labIndex}>
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={marks[index]?.marks[lab].attendance || ""}
                    onChange={(e) =>
                      handleMarksChange(
                        index,
                        lab,
                        "attendance",
                        e.target.value
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th colSpan={2}>Total</th>
            {teacherLecture.map((lecture, lectureIndex) => (
              <React.Fragment key={lectureIndex}>
                <th>
                  {/* Input field for the total lectures */}
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={total[lecture]?.totalMarks || ""}
                    onChange={(e) =>
                      handleTotalChange(lecture, "totalMarks", e.target.value,"lecture")
                    }
                  />
                </th>
                <th>
                  {/* Input field for the exam marks */}
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={total[lecture]?.totalAttendance || ""}
                    onChange={(e) =>
                      handleTotalChange(
                        lecture,
                        "totalAttendance",
                        e.target.value,
                        "lecture"
                      )
                    }
                  />
                </th>
              </React.Fragment>
            ))}
            {teacherLab.map((lab, labIndex) => (
              <React.Fragment key={labIndex}>
                <th>
                  {/* Input field for the lab attendance */}
                  <input
                    type="number"
                    placeholder="-"
                    className="inp"
                    value={total[lab]?.totalAttendance || ""}
                    onChange={(e) =>
                      handleTotalChange(lab, "totalAttendance", e.target.value,"lab")
                    }
                  />
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
      </table>

      <div className="buttons">
        <button className="btn saveBtn" onClick={handleSave}>
          <span>Save</span>
        </button>
        <button className="btn saveBtn">
          <span>Cancel</span>
        </button>
      </div>
    </>
  );
}

