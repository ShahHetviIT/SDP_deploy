const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else {
        console.log("failed");
        return res.json({ msg: "Failed to add message to the database" })
    };
  } catch (ex) {
    next(ex);
  }
};

// const Messages = require("../models/messageModel");

// module.exports.addMessage = async (req, res, next) => {
//   try {
//     const { from, to, message } = req.body;

//     if (typeof message === "object") {
//       // Handle array case (assuming message is an array of files)
//       console.log("message received");

//       const title = message.title;
//       console.log(title);
//       const fileName = message.name;
//       console.log(fileName);
//       const data = await Messages.create({
//         title: title,
//         message: { text: fileName },
//         users: [from, to],
//         sender: from,
//       });

//       if (data) {
//         return res.json({ msg: "Message added successfully." });
//       } else {
//         console.log("Failed to add message to the database");
//         return res.json({ msg: "Failed to add message to the database" });
//       }
//     } else if (typeof message === "string") {
//       // Handle the case when message is a string (regular text message)
//       console.log("Single message:", message);

//       const data = await Messages.create({
//         message: { text: message },
//         users: [from, to],
//         sender: from,
//       });

//       if (data) {
//         return res.json({ msg: "Message added successfully." });
//       } else {
//         console.log("Failed to add message to the database");
//         return res.json({ msg: "Failed to add message to the database" });
//       }
//     } else {
//       // Invalid message format
//       console.log("Invalid message format");
//       return res.status(400).json({ msg: "Invalid message format" });
//     }
//   } catch (ex) {
//     next(ex);
//   }
// };
