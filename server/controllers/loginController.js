const StudentModel = require("../models/studentModel");
const TeacherModel = require("../models/teacherModel");

// Adjust the path as needed
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const UserModel = role === "student" ? StudentModel : TeacherModel;

    UserModel.findOne({ username, password })
      .then((user) => {
        if (user) {
          if (user.role === role) {
            // sessionStorage.setItem(
            //   "user",
            //   JSON.stringify({
            //     username: user.username,
            //     userId: user._id,
            //     role: user.role,
            //   })
            // );
            const varName = {
              success: true,
              message: `${
                role.charAt(0).toUpperCase() + role.slice(1)
              } successfully logged in`,
              userId: user._id,
              avatarImage: user.avatarImage,
              isAvatarImageSet: user.isAvatarImageSet,
              profileImage: user.profileImage,
              isProfileImageSet: user.isProfileImageSet,
            };
            console.log(varName);
            return res.json(varName);
          } else {
            res.json({
              success: false,
              message: `You are not authorized as a ${role}`,
            });
          }
        } else {
          res.json({ success: false, message: "No record exists" });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.message });
      });
  } catch (ex) {
    next(ex);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;

//     // Fetch the user data to determine the role
//     const userData = await userId.findById(userId);

//     if (!userData) {
//       return res.json({ success: false, message: 'User not found' });
//     }

//     // Choose the appropriate model based on the user's role
//     const UserModel = userData.role === 'teacher' ? TeacherModel : StudentModel;

//     // Update the avatar using the chosen model
//     const updatedUserData = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );

//     return res.json({
//       isSet: updatedUserData.isAvatarImageSet,
//       image: updatedUserData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

// const StudentModel = require('../models/studentModel');
// const TeacherModel = require('../models/teacherModel');

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Fetch the user data to determine the role
    const teacherData = await TeacherModel.findById(userId);
    const studentData = await StudentModel.findById(userId);
    console.log(teacherData);
    console.log(studentData);

    // Check if the user is a teacher
    if (teacherData) {
      const updatedTeacherData = await TeacherModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );

      return res.json({
        isSet: updatedTeacherData.isAvatarImageSet,
        image: updatedTeacherData.avatarImage,
      });
    }

    // Check if the user is a student
    if (studentData) {
      const updatedStudentData = await StudentModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );

      return res.json({
        isSet: updatedStudentData.isAvatarImageSet,
        image: updatedStudentData.avatarImage,
      });
    }

    // If neither teacher nor student found
    return res.json({ success: false, message: "User not found" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsersTeachers = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const users = await TeacherModel.find({
      _id: { $ne: req.params.id },
      $or: [
        { avatarImage: { $exists: true, $ne: false, $ne: null, $ne: "" } },
        { profileImage: { $exists: true, $ne: false, $ne: null, $ne: "" } }
      ]
    }).select(["username", "avatarImage", "profileImage", "isAvatarImageSet", "isProfileImageSet", "_id"]);
    console.log(users);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};



module.exports.getAllUsersStudents = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const users = await StudentModel.find({
      _id: { $ne: req.params.id },
      $or: [
        { avatarImage: { $exists: true, $ne: false, $ne: null, $ne: "" } },
        { profileImage: { $exists: true, $ne: false, $ne: null, $ne: "" } }
      ]
    }).select(["username", "avatarImage", "profileImage", "isAvatarImageSet", "isProfileImageSet", "_id"]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};




module.exports.getAllStudents = async (req, res, next) => {
  try {
    const users = await StudentModel.find({}).select([
      "username",
      "rollNo",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// const StudentModel = require('../models/studentModel');

// Controller function to add marks and attendance
module.exports.addMarksAttendance = async (req, res, next) => {
  try {
    const { marks, total, sessional } = req.body;
    console.log(sessional);

    // Iterate through the marks data array
    for (const studentData of marks) {
      const studentId = studentData._id;
      const studentMarks = studentData.marks;

      // Find the student document by ID
      const student = await StudentModel.findById(studentId);

      if (!student) {
        console.log(`Student with ID ${studentId} not found.`);
        continue; // Skip to the next iteration
      }

      // Update the marks and attendance data for each subject
      for (const [subject, { marks, attendance, type }] of Object.entries(
        studentMarks
      )) {
        if (type === "lecture") {
          // Update lecture marks and attendance
          student[sessional].marksLecture[subject] = marks;
          student[sessional].attendanceLecture[subject] = attendance;
        } else if (type === "lab") {
          // Update lab attendance only
          student[sessional].attendanceLab[subject] = attendance;
        }
      }

      // Save the updated student document
      await student.save();
    }

    // Iterate through the total data array
    for (const studentData of marks) {
      const studentId = studentData._id;

      // Find the student document by ID
      const student = await StudentModel.findById(studentId);

      if (!student) {
        console.log(`Student with ID ${studentId} not found.`);
        continue; // Skip to the next iteration
      }

      // Update the total marks and attendance data for each subject
      for (const [
        subject,
        { totalMarks, totalAttendance, type },
      ] of Object.entries(total)) {
        if (type === "lecture") {
          // Update lecture total marks and attendance
          student[sessional].totalExamMarks[subject] = totalMarks;
          student[sessional].totalAttendanceLecture[subject] = totalAttendance;
        } else if (type === "lab") {
          // Update lab total attendance only
          student[sessional].totalAttendanceLab[subject] = totalAttendance;
        }
      }

      // Save the updated student document
      await student.save();
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Marks and attendance added successfully.",
      });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding marks and attendance." });
  }
};

// Controller function to get marks and attendance data for students
module.exports.getStudentMarksAttendance = async (req, res, next) => {
  try {
    const { studentContacts, sessional } = req.body;
    const studentIds = studentContacts.map((student) => student._id);

    // Fetch student documents from the database using the provided IDs
    const students = await StudentModel.find({ _id: { $in: studentIds } });

    // Construct an object to store marks and attendance data for each student
    const marksAttendanceData = {};

    // Iterate over each student and extract marks and attendance data
    students.forEach((student) => {
      marksAttendanceData[student._id] = {
        marksLecture: student[sessional].marksLecture,
        attendanceLecture: student[sessional].attendanceLecture,
        attendanceLab: student[sessional].attendanceLab,
      };
    });

    // Send the marks and attendance data in the response
    res.json(marksAttendanceData);
  } catch (error) {
    console.log("Error fetching marks and attendance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get total marks and attendance data for students
module.exports.getTotalStudentMarksAttendance = async (req, res, next) => {
  try {
    const { studentContacts, sessional } = req.body;
    const studentIds = studentContacts.map((student) => student._id);

    // Fetch student document from the database using the ID of the first student
    const firstStudent = await StudentModel.findOne({ _id: studentIds[0] });

    if (!firstStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    const totalMarksAttendanceData = {
      totalExamMarks: firstStudent[sessional].totalExamMarks,
      totalAttendanceLecture: firstStudent[sessional].totalAttendanceLecture,
      totalAttendanceLab: firstStudent[sessional].totalAttendanceLab,
    };

    res.json(totalMarksAttendanceData);
  } catch (error) {
    console.log("Error fetching Total marks and attendance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getTeacherSubjects = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // console.log("User ID:", userId);

    const teacherData = await TeacherModel.findById(userId);
    if (!teacherData) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // console.log(teacherData);

    return res.json(teacherData);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};

module.exports.getCurrentStudentDetails = async (req, res, next) => {
  try {
    console.log("heloooooo");
    const userId = req.params.id;
    console.log("User ID:", userId);

    const studentData = await StudentModel.findById(userId);
    if (!studentData) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // console.log(teacherData);

    return res.json(studentData);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};
