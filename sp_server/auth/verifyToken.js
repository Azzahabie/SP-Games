var jwt=require('jsonwebtoken');

var secretKey=require('./secretKey');

function verifyToken(req,res,next){
    console.log("verifying");
    console.log(req);

    var token=req.headers['authorization']; //retrieve authorization header’s content
    // console.log("your token conetnt: "+token);

    if(!token || !token.includes('Bearer')){ //process the token
        console.log("no token");

        res.status(403);
        return res.send({auth:'false',message:'Not authorized!'});
    }else{
        console.log("token found");
        token=token.split('Bearer ')[1]; //obtain the token’s value
        // console.log(token);
        jwt.verify(token,secretKey,function(err,decoded){//verify token
            if (err){
                res.status(403);
                return res.end({auth:false,message:'Not authorized!'});
            }else{

                // console.log(decoded);

                req.userid=decoded.user_id; //decode the userid and store in req for use
                req.role=decoded.role; //decode the role and store in req for use
                // console.log("decoded raw " + JSON.stringify(decoded.user_id))
                // console.log("decoded msg " + req.role.length + " " + req.userid);
               var fck = "admin"
               var a = "admin"
               var l = fck.localeCompare(a)

                if(l == 1 || l == -1){
                    console.log("role is not admin");
                }
                console.log(fck.localeCompare("admin"));
                next();
            }

        });
    }

}

module.exports=verifyToken;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxMTk5MTI5NSwiZXhwIjoxNjEyMDc3Njk1fQ.nSKPCe1H1Ch8B50P7dIwIzjFf6S1v1q-WQ8I47VED2U