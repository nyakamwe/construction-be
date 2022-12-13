const {Profile} = require('../models/index')

const getProfile = async(req, res)=>{
    const profiles = await Profile.findAll()

    return res.status(200).json({
        profiles
    })
}

const editProfile = async(req, res)=>{
    const data = req.body
    data.userId = 1
    
    const profile = await Profile.findOne({where: {id: 1}})
    data.about ? data.about : profile.about,
    data.experience ? data.experience : profile.experience,
    data.companies ? data.companies : profile.companies,
    data.telephone ? data.telephone : profile.telephone,
    data.email ? data.email : profile.email
    data.completed ? data.completed : data.completed

    const updated = await profile.update({...data})
    return res.status(200).json({
        updated
    })
}

module.exports = {
    getProfile,
    editProfile
}