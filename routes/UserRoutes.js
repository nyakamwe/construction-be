const express= require('express');
// import {authenticateToken} from "../AuthMiddleWare/AuthenticateToken";

const { users_get_all, user_create, user_get_token } =require('../controllers/userControllers')

const router = express.Router();

//login user
router.post("/users/login", user_get_token)

module.exports = router