import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Contacts from "./components/Contacts";
import Login from "./components/Login";
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import SetAvatar from "./components/SetAvatar/SetAvatar";
import Chatbox from "./components/Tutorbot/Chatbox";
import AttendanceTeacher from "./components/Gradebook/Teacher/AttendanceTeacher";
import Select from "./components/SetAvatar/Select";
import SetProfileImage from "./components/SetAvatar/SetProfileImage";
import AttendanceStudent from "./components/Gradebook/Student/AttendanceStudent";
import Stream from "./components/Edushare/Stream";
import Home from "./components/Edushare/Home";


const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     const authToken = sessionStorage.getItem("user");
  //     setIsAuthenticated(!!authToken);
  //     setLoading(false);
  //   };

  //   checkAuthentication();
  // }, []);

  // if (loading) {
  //   // You might want to show a loading spinner or some indication while checking authentication
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/select" element={<Select/>}/>
        <Route path="/setProfileImage" element={<SetProfileImage/>}/>
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendanceTeacher" element={<AttendanceTeacher/>}/>
        <Route path="/attendanceStudent" element={<AttendanceStudent/>}/>
        <Route path="/stream/:id" element={<Stream />} />
        <Route path="/edushare" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
