const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAvatarImageSet: Boolean,
  avatarImage: String,
  profileImage: String,
  isProfileImageSet: Boolean,
  role: { type: String, default: 'teacher' },
});

const TeacherModel = mongoose.model('teachers', teacherSchema);

module.exports = TeacherModel;