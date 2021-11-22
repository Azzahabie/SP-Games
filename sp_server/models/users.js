//core 
var db = require('./databaseConfig.js');
//other core
var user = {}

//ENDPOINT 1
// user.getAllUsers = (callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement = 'select * from userinfo';
//             conn.query(sqlStatement, (err, result) => {
//                 conn.end();
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else {
//                     return callback(null, result);
//                 }
//             })
//         }
//     })
// }

//ENDPOINT 2 AND BONUS ENDPOINT 


// //ENDPOINT 2 AND BONUS ENDPOINT
// user.insertNewUser =  (username,email,password,type,picurl,callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement = 'INSERT INTO userinfo (username,email,password,type,picurl) values (?,?,?,?,?)';
//             conn.query(sqlStatement,[username,email,password,type,picurl],(err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else {
//                     var test = 'SELECT userid FROM userinfo order by userid DESC LIMIT 1;'
//                     conn.query(test,(err ,res)=>{
//                         conn.end();
//                         if(err){
//                             console.log(err);
//                             return callback(err,null);
//                         } else {
//                             return callback(null,res)
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }


// //ENDPOINT 3
// user.getUserById = (userid, callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement = 'select * from userinfo where userid=?';
//             conn.query(sqlStatement, [userid], (err, result) => {
//                 conn.end();
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else {
//                     return callback(null, result);
//                 }
//             })
//         }
//     })
// }


//-------------------------------LOGIN FOR WEB API----------------------------------------------------------------
user.checkLogin = (username, password, callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement = 'select * from userinfo WHERE username = ? and password = ?';
            conn.query(sqlStatement, [username, password], (err, result) => {
                conn.end();
                if (result[0] == null) { //if username or password is wrong or doesnt exist err will be null
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null, result)
                }
            })
        }
    })
}
//-----------------------------------------------REGISTER PAGE-------------------------------------------------------
user.insertNewUser = (username, email, password, role, picurl, callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement = 'INSERT INTO userinfo (username,email,password,role,picurl) values (?,?,?,?,?)';
            conn.query(sqlStatement, [username, email, password, role, picurl], (err, result) => {
                conn.end()
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null, result)
                }
            })
        }
    })
}

module.exports = user;
