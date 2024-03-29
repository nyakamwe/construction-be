const {Project} = require('../models/index')
const cloudinary = require('../imageUploader')

const get_all_projects = async(req,res)=>{
    const projects = await Project.findAll({where: {status: 'active'}})
    return res.status(200).json({count: projects.length, success: true, status:200, projects})
}

const add_project = async(req, res)=>{
    const {title, description, duration} = req.body
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
			const project = new Project({
				title: req.body.title,
				description: req.body.description,
				duration,
				image: cloud_save.url
			})
			
			await project.save()
	
			return delete project.get().status && 
				res.status(201).json({
					status:201, 
					project,
					message:"Project Saved successfully", 
					success: true
				})
			
		}
    }    
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const project_get_one = async (req, res) => {
	try {
		const project = await Project.findOne({where:{ id: req.params.id }})

		if(project === null){
			return res.status(404).json({status: 404, message:"Project of that id is not available"});
		}

		return res.status(200).json({status: 200, project, message:"successfully fetched"});

	} catch(error) {
		return res.status(500).json({message: "Internal Server Error"})
	}
}

const project_del = async (req, res) => {
	try {
		const project = await Project.findOne({where:{id:req.params.id}})
		if(project != null){

			await project.update({status: 'inactive'});
			return res.status(200).json({status: 200, message: "Project deleted successfully!"})
		}
		else{
			return res.status(404).json({error: "Project doesn't exist!"})
		}

		
	} catch(error) {
		return res.status(500).json({error: "Internal Server error", message:error.message })
	}
}

const project_update = async (req, res) => {
	try {
		const project = await Project.findOne({where:{ id: req.params.id, status: 'active' }})
		if(project){
			if(req.files){

				const cloud_save = await cloudinary.uploader.upload(req.file.path, {
					with:500,
					height:500,
					crop:'fill'
		
				})
				const results = await Promise.all(req.files.map(async (file) => {
					const result = await cloudinary.uploader.upload(file.path, { folder: '../uploads' });
					return { filename: result.original_filename, url: result.secure_url };
				}));
				project.title = req.body.title || project.title,
				project.description = req.body.description || project.description
				project.images = results.map((result) => ({ url: result.url })),
				project.status = req.body.status || project.status
				
				project.save()
				return res.status(200).json({status: 200, message:"Project successfully updated!"});

			}else{
				try {
					project.title = req.body.title || project.title,
					project.description = req.body.description || project.description
					project.images = project.images,
					project.status = req.body.status || project.status

					project.save()
					return res.status(200).json({status: 200, message:"Project successfully updated!"});
				} catch (error) {
					return res.status(400).json({error});
					
				}
			}
			
		}
		else{
			return res.status(404).json({message: "Project doesn't exist!"})
		}

	} catch(error) {
		return res.status(500).json({error: error.message, message:'Internal server error'})
	}
}

const addingProject = async (req, res) => {
	const { title, description, duration } = req.body;
	try {
		if(title.trim() === '' || description.trim() === ''){
			return res.status(400).json({message:"Title and description are required"})
		}else{
	  const results = await Promise.all(req.files.map(async (file) => {
		  const result = await cloudinary.uploader.upload(file.path, { folder: '../uploads' });
		  return { filename: result.original_filename, url: result.secure_url };
		}));
	
		console.log('result', results.map((result) => ({ filename: result.filename, url: result.url })))
	  const project = new Project({
		title: title,
		description: description,
		duration,
		images: results.map((result) => result.url )
	  });
	  await project.save();
	  res.send(project);
	}
	} catch (err) {
	  console.log(err);
	  res.status(500).send('An error occurred');
	}
  };
  


module.exports = {get_all_projects, add_project, project_get_one, project_del, 
					project_update, addingProject}