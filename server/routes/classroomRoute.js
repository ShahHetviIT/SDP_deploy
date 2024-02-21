const { addClassroom, getClassroom } = require("../controllers/classroomController");
const upload = require("../middleware/multer");
const Classroom = require("../models/classroomModel");

const router = require("express").Router();

router.post("/addClassroomDetails", addClassroom);
router.post("/getClassroomDetails", getClassroom);

router.post("/upload-files", upload.single("file"), async (req, res) => {
    try {
        // Access uploaded file information
        const fileName = req.file.filename;
        console.log("Uploaded file:", fileName);

        // Access form fields
        const title = req.body.title;
        const inputValue = req.body.inputValue;
        const className = req.body.classname;
        const classId = req.body.classId;

        // Update the corresponding document in the database
        const updatedClassroom = await Classroom.findByIdAndUpdate(
            classId,
            {
                $push: { 
                    pdf: fileName,  // Append the uploaded filename to the pdf array
                    pdfName: title, // Append the title to the pdfName array
                    description: inputValue,
                },
                 // Update the description field
            },
            { new: true } // Return the updated document
        );

        if (updatedClassroom) {
            return res.json({ msg: "File uploaded successfully.", data: updatedClassroom });
        } else {
            console.log("Failed to update classroom with file upload.");
            return res.status(400).json({ msg: "Failed to update classroom." });
        }
    } catch (error) {
        console.error("Error handling file upload:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/get-files/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const data = await Classroom.find({ _id: userId }); // Query documents where userId field matches the userId parameter
        // console.log(data);
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});

  
  







module.exports = router;