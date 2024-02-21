const {
  login,
  setAvatar,
  getAllUsersTeachers,
  getAllUsersStudents,
  getAllStudents,
  addMarksAttendance,
  getTeacherSubjects,
  getStudentMarksAttendance,
  getTotalStudentMarksAttendance,
  getCurrentStudentDetails,
} = require("../controllers/loginController");
const upload = require("../middleware/multer");
const studentModel = require("../models/studentModel");
const teacherModel = require("../models/teacherModel");

const router = require("express").Router();

router.post("/login", login);
router.post("/addMarksAttendance", addMarksAttendance);
router.post("/setavatar/:id/:role", setAvatar);
router.get("/allusersteacher/:id", getAllUsersTeachers);
router.get("/alluserstudent/:id", getAllUsersStudents);
router.get("/alluserstudent", getAllStudents);
router.get("/getTeacherSubjectName/:id", getTeacherSubjects);
router.post("/getMarksAttendance", getStudentMarksAttendance);
router.post("/getTotalMarksAttendance", getTotalStudentMarksAttendance);
router.get("/getCurrentStudent/:id",getCurrentStudentDetails);

router.post("/setProfileImage", upload.single("file"), async (req, res) => {
  try {
    // Assuming you want to associate the uploaded image with a user,
    // you can access the user's id and role from the request parameters
    const id = req.body.id;
    const role = req.body.role;
    const fileName = req.file.filename;
    console.log(id);
    console.log(req.file.path);

    // Check if the uploaded file exists
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Assuming you want to save the file path or other information in the user's profile
    // You can update the user's profile (student or teacher) with the file information
    if (role === "student") {
      await studentModel.findByIdAndUpdate(id, {
        profileImage: fileName,
        isProfileImageSet: true,
      });
    } else if (role === "teacher") {
      await teacherModel.findByIdAndUpdate(id, {
        profileImage: fileName,
        isProfileImageSet: true,
      });
    }

    // Send a success response
    return res.status(200).json({
      message: "Profile image uploaded successfully",
      profileImage: fileName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
