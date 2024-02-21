const router = require("express").Router();
const upload = require("../middleware/multer");

router.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    res.send("hii");
  });

  module.exports = router;