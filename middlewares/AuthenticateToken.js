const jwt = require('jsonwebtoken')
const { verifyToken } = require('../helpers/hash')

module.exports = {async authenticateToken(req, res, next){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(401).json({message:'Token is required'})

	jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=>{
	
		if(error) return res.status(403).json({message:"Invalid Token"})

		req.user = user;
		
		next();
	})

    
}
}