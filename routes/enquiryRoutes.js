const express = require('express');
const { authenticateToken } = require('../middlewares/AuthenticateToken');

const router = express.Router();

const {messages_get_all, message_create, message_get_one, message_delete_one} = require("../controllers/enquiryControllers")


router.get("/messages", authenticateToken, messages_get_all)
router.get("/messages/:messageId", authenticateToken, message_get_one)
router.post("/messages", message_create)
router.delete("/messages/:messageId", authenticateToken, message_delete_one)

module.exports = router