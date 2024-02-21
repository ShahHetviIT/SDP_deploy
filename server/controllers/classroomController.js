const classroomModel = require("../models/classroomModel");

module.exports.addClassroom = async (req, res, next) => {
    try {
        const { classRoom, subject,teacher } = req.body; // Corrected variable names

        const data = await classroomModel.create({
            classname: classRoom, // Corrected variable name
            subject: subject,
            teacher: teacher, // Corrected variable name
        });

        if (data) return res.json({ msg: "Classroom details added successfully" });
        else {
            console.log("Failed");
            return res.json({ msg: "Failed to add classroom details to the database" });
        }
    } catch (ex) {
        console.log("error");
        next(ex);
    }
};

module.exports.getClassroom = async (req, res, next) => {
    try {
        // Assuming you want to retrieve all classroom details
        const classroomDetails = await classroomModel.find(); // Corrected model name
    
        res.status(200).json(classroomDetails);
    } catch (error) {
        console.error('Error fetching classroom details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};