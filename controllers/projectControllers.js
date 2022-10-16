const {Project} = require('../models/index')
const cloudinary = require('../imageUploader')

const get_all_projects = async(req,res)=>{
    const projects = await Project.findAll()
    return res.status(200).json({success: true, status:200, projects})
}

const add_project = async(req, res)=>{
    const {title, description} = req.body
    try {
		if(title === '' || description === ''){
			return res.status(400).json({message:"Title and description are required"})
		}
		else{
			// generating link from cloudinary
			const cloud_save = await cloudinary.uploader.upload(req.file.path, {
				with:500,
				height:500,
				crop:'fill'

			})
			// const imageUrl = cloud_save ? cloud_save.url : 
			// new post
			const project = new Project({
				title: req.body.title,
				description: req.body.description,
				image: cloud_save.url
				
				
			})
			
			await project.save()
	
			return res.status(201).json({
				status:201, 
				message:"Project Saved successfully", 
				success: true,
				imageUrl:`${cloud_save.url}`
			})
		}
    }    
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}
module.exports = {get_all_projects, add_project}