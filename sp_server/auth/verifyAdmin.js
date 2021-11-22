const jwt = require("jsonwebtoken");
const secretKey = require("./config");


function verifyAdmin(req, res, next){
    console.log("launching Admin Verification");
    var token=req.headers['authorization']
    if (token === null || token === undefined || !token.startsWith("Bearer ")) {
        res.status(401).send();
        return;
    }
    
    token = token.split('Bearer ')[1];
    jwt.verify(token, secretKey, function (err, decoded) {//verify token
        let a = "admin";
        let compare = decoded.role.localeCompare(a)
        if (err) {
            res.status(403);
            return res.end({ auth: false, message: 'Not authorized!' });
        } else if (compare == 1 || compare == -1){
            res.status(403);
            return res.end({ auth: false, message: 'Not authorized!' });
            
        } else {
            console.log("certified Admin");
            req.userid=decoded.user_id;
            req.role=decoded.role;
            next();
        }
    });
}

module.exports=verifyAdmin;