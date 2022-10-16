const express= require('express');
const { get_all_projects, add_project } =require('../controllers/projectControllers')
const upload = require('../uploadConfig')

const router = express.Router();

router.get("/projects", get_all_projects)
router.post("/projects", upload.single('image'), add_project)

module.exports = router