import React from 'react';

export default function Sessional3({ currentStudent }) {
  const sessional3Data = currentStudent.sessional3;
  const subjects = currentStudent.subjects;

  const totalMarks = subjects.reduce((total, subject) => {
    return total + (parseInt(sessional3Data.marksLecture[subject]?.reduce((acc, mark) => acc + mark, 0)) || 0);
  }, 0);
  
  // Convert totalExamMarks to integers and calculate total possible marks
  const totalPossibleMarks = subjects.reduce((total, subject) => {
    return total + (parseInt(sessional3Data.totalExamMarks[subject]) || 0);
  }, 0);
  
  // Convert attendance to integers and calculate total attendance
  const totalAttendance = subjects.reduce((total, subject) => {
    return total + (parseInt(sessional3Data.attendanceLecture[subject]) || 0) + (parseInt(sessional3Data.attendanceLab[subject]) || 0);
  }, 0);
  
// Calculate total possible attendance based on the actual number of lectures and labs for each subject
const totalPossibleAttendance = subjects.reduce((total, subject) => {
    const lectures = parseInt(sessional3Data.totalAttendanceLecture[subject]) || 0;
    const labs = parseInt(sessional3Data.totalAttendanceLab[subject]) || 0;
    // Ensure lectures and labs are valid numbers
    const totalAttendanceForSubject = parseInt(lectures) + parseInt(labs);
    console.log(totalAttendanceForSubject);
    if (!isNaN(totalAttendanceForSubject)) {
      return total + totalAttendanceForSubject;
    } else {
      return total; // Exclude invalid attendance values from the total
    }
  }, 0);

  const marksPercentage = totalPossibleMarks !== 0 ? (totalMarks / totalPossibleMarks) * 100 : 0;
  const attendancePercentage = totalPossibleAttendance !== 0 ? (totalAttendance / totalPossibleAttendance) * 100 : 0;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan="7">Sessional 3</th>
          </tr>
          <tr>
            <th className='wid' colSpan="1">Subject Name</th>
            <th className='wid' colSpan="1">Marks</th>
            <th className='wid' colSpan="1">Marks Out Of</th>
            <th className='wid' colSpan="1">Lecture Attendance</th>
            <th className='wid' colSpan="1">Lecture Attendance Out Of</th>
            <th className='wid' colSpan="1">Lab Attendance</th>
            <th className='wid' colSpan="1">Lab Attendance Out Of</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject}</td>
              <td>{sessional3Data.marksLecture[subject]?.join(", ") || ''}</td>
              <td>{sessional3Data.totalExamMarks[subject]}</td>
              <td>{sessional3Data.attendanceLecture[subject]}</td>
              <td>{sessional3Data.totalAttendanceLecture[subject]}</td>
              <td>{sessional3Data.attendanceLab[subject]}</td>
              <td>{sessional3Data.totalAttendanceLab[subject]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='card1'>
      <h6>Total Marks: {totalMarks}</h6>
        <h6>Marks Percentage: {marksPercentage.toFixed(2)}%</h6>
        <h6>Attendance Percentage: {attendancePercentage.toFixed(2)}%</h6>
      </div>
    </>
  );
}
