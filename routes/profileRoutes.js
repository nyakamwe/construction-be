const express = require('express')
const router = express.Router();
const {getProfile, editProfile} = require('../controllers/profileControllers')

router.get('/profiles', getProfile)
router.put('/profiles', editProfile)

module.exports = router
