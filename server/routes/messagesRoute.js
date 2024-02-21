const {
  addMessage,
  getMessages,
} = require("../controllers/messagesController");
const router = require("express").Router();
const upload = require("../middleware/multer")
const Messages = require("../models/messageModel");

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

// router.use("../files",express.static("files"));

router.post("/upload-files", upload.single("file"), async (req, res) => {
    try {
      console.log(req.file);
      const title = req.body.title; // Use req.body.get("title") to get the title
      const fileName = req.file.filename;
      const from = req.body.from;
      const to = req.body.to;
  
      const data = await Messages.create({
        pdf: fileName,
        message: { text: title },
        users: [from, to],
        sender: from,
      });
  
      if (data) {
        return res.json({ msg: "Message added successfully." });
      } else {
        console.log("Failed to add message to the database");
        return res.json({ msg: "Failed to add message to the database" });
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  

  router.get("/get-files",async(req,res)=>{
    try{
      Messages.find({}).then((data)=> {
        res.send({status: "ok", data: data});
      });
    }catch(error){

    }
  })
  
  

// router.post("/add-messages", addMessage);
// router.get("/get-messages", getMessages);

module.exports = router;
