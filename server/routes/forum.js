const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const upload = require("../config/multer");

router.post("/", upload.single("file"), forumController.create); 

module.exports = router;