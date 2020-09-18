const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    const sessUser = req.session.user;
    if(sessUser){
        return res.json({msg:'Authenticated successfully',sessUser})
    }
    // Check For Token
    else if(!token) return res.status(401).json({msg:'Unauthorized,No Token'});

    try {
        // Verify Token
        const decoded = jwt.verify(token,'project1');
    
        // Add User From Payload
        req.user = decoded;
        next();

    } catch(e){
        res.status(400).json({msg:'Token is Not Valid'});
    }
}

module.exports = auth;