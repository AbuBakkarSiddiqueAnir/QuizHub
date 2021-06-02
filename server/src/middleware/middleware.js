const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');

const auth = async (req, res, next) => {
  
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        
        const decodedToken = jwt.verify(token, "This_is_a_quiz_app!");
        const user = await userModel.findOne({_id: decodedToken.id,"tokens.token" : token})
        
        if(!user) throw new Error();
        
        req.token = token;
        req.user = user;

        next()
    }catch(err){
        res.status(401).send("please authenticate")
    }
}

module.exports = auth;