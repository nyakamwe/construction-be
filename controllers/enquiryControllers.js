const {Contact} = require('../models/index');
const sendEmail  = require('../sendEmail/mailService');

//contact or mesages
const messages_get_all = async (req, res)=>{
    try{
        const messages = await Contact.findAll();
        if (messages == null) return  res.status(200).json({success: 200, messages, message:"Messsages fetched!"})
       
        return res.status(200).json({success: 200, messages, message:"Messsages fetched!"})
        } catch(error){
        return res.status(500).json({message: 'Internal server error'})
    }
    
}

// get single message
const message_get_one = async (req, res)=>{
    try{
        const message = await Contact.findOne({where:{id:req.params.messageId}});
        if (!message) return  res.status(404).json({status: 404, message:"Message is not available"})
       
        return res.status(200).json({status: 200, message})

        } catch(error){
        return res.status(500).json({message: 'Internal server error'})
    }
    
}

// delete a message
const message_delete_one = async (req, res)=>{
    try{
        const message = await Contact.findOne({where:{id:req.params.messageId}});
        if (!message) return  res.status(404).json({status: 404, message:"Message not available"})
        
        await message.destroy()

        return res.status(200).json({status: 200, message:"Message Deleted!"})

        } catch(error){
        return res.status(500).json({message: 'Internal server error'})
    }
    
}

// sending a message
const message_create = async(req, res)=>{
    if(req.body.sender === '' || req.body.message === ''){
        return res.status(403).json({message:"sender and message are required"})
    }
    else{
        const message = new Contact({
            sender: req.body.sender,
            name:req.body.name,
            message: req.body.message,
    
        })
        await message.save()

        await sendEmail(message)
        return res.status(201).json({status: 201, message:"Message Sent successfully"})
    }
}

module.exports = {messages_get_all, message_create, message_get_one, message_delete_one}
