import React, { useState } from "react";
import axios from "axios";

export default function Total({ studentContacts, teacherLecture, teacherLab }) {
  // Initialize total state with the correct structure
  const initialTotalState = () => {
    const lectureTotal = teacherLecture.reduce((acc, lecture) => {
      acc[lecture] = { examMarks: "", totalLectures: "" };
      return acc;
    }, {});
    const labTotal = teacherLab.reduce((acc, lab) => {
      acc[lab] = { labAttendance: "" };
      return acc;
    }, {});
    return { ...lectureTotal, ...labTotal };
  };

  // State to store the total
  const [total, setTotal] = useState(initialTotalState);

  // Function to handle changes in total
  const handleTotalChange = (subject, type, value) => {
    setTotal((prevTotal) => ({
      ...prevTotal,
      [subject]: {
        ...prevTotal[subject],
        [type]: value,
      },
    }));
  };

  // Function to handle saving total
  const handleSave = async () => {
    try {
      console.log(total);
      // Here you can send the total data to the server to insert into the database
      const result = await axios.post("/api/insertTotal", { total });
      if (result.data.success) {
        console.log("Total inserted Successfully");
      } else {
        console.log("Total not inserted");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <thead>
      <tr>
        <th colSpan={2}>Total</th>
        {teacherLecture.map((lecture, lectureIndex) => (
          <React.Fragment key={lectureIndex}>
            <th>
              {/* Input field for the total lectures */}
              <input
                type="number"
                placeholder="Total Lectures"
                className="inp"
                value={total[lecture]?.examMarks || ""}
                onChange={(e) => handleTotalChange(lecture, "examMarks", e.target.value)}
              />
            </th>
            <th>
              {/* Input field for the exam marks */}
              <input
                type="number"
                placeholder="Exam Marks"
                className="inp"
                value={total[lecture]?.totalLectures || ""}
                onChange={(e) => handleTotalChange(lecture, "totalLectures", e.target.value)}
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
                placeholder="Lab Attendance"
                className="inp"
                value={total[lab]?.labAttendance || ""}
                onChange={(e) => handleTotalChange(lab, "labAttendance", e.target.value)}
              />
            </th>
          </React.Fragment>
        ))}
      </tr>
      <tr>
        <th colSpan={teacherLecture.length * 3 + teacherLab.length}>
          <button className="btn saveBtn" onClick={handleSave}>
            <span>Save</span>
          </button>
        </th>
      </tr>
    </thead>
  );
}
