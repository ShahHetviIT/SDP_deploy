const mongoose = require("mongoose");

const classroomSchema = mongoose.Schema(
    {
        pdf: {
            type: [String], // Changed type to an array of strings
            default: [],
        },
        pdfName:{
            type: [String], // Changed type to an array of strings
            default: [],
        },
        description: {
            type: [String], // Changed type to an array of strings
            default: [],
        },
        classname: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        teacher: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Classroom", classroomSchema);
