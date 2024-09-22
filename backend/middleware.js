const JWT_SECRET = require('./config');
const jwt = require('jsonwebtoken');

//use this middeware to verify user requests to protected routes
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
   
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({msg:"Cannot find token"})
    }
    const token = authHeader.split(' ')[1]; //second chunk in the authHeader is the token

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        
        
        console.log("Decoded token:", decoded); // Log the decoded token
        
        
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({msg:"Invalid token"});
        }
    }
    catch(err){
        return res.status(403).json({msg:"Error verifying token"});
    }
};

module.exports = {
    authMiddleware
}