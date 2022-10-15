const {User} = require('../models/index')
const Protection = require('../helpers/hash')
const {checkPassword, signToken} = Protection

//login user
const user_get_token= async (req, res)=>{
    const {email, password} = req.body
	try {
		const user = await User.findOne({
                             where: { email }
                            });
        if(user){
            const match = await checkPassword(password, user.password);
            
            if(match){
                const data = {
                    email: user.email,
                    password: user.password
                }
                const accesToken = await signToken(data);
                return res.status(200).json({Token:accesToken});
            }else{
                return res.status(404).json({message: "Invalid password"});
            }
        }else{
            return res.status(404).json({message: "user of this email doen't exist"});
        }
        
	  } catch (error) {
		res.status(500).json({message:"Internal Server error occured", error: error.message});
	  }
}

module.exports= { user_get_token}
