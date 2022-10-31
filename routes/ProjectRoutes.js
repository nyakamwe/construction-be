const express= require('express');
const { get_all_projects, add_project, project_get_one, project_del, project_update } =require('../controllers/projectControllers');
const { authenticateToken } = require('../middlewares/AuthenticateToken');
const upload = require('../uploadConfig')

const router = express.Router();

router.get("/projects", get_all_projects)
router.post("/projects", authenticateToken, upload.single('image'), add_project)
router.get("/projects/:id", project_get_one)
router.delete("/projects/:id", authenticateToken, project_del)
router.put("/projects/:id", authenticateToken, upload.single('image'), project_update)

module.exports = router