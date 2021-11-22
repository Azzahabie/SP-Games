
var db = require('./databaseConfig.js');

var review = {}

//ENDPOINT 10
// review.insertNewReview = (content, rating, userid, gameid, callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement = `Insert into reviews (content,rating,user_id,game_id) values (?,?,?,?)`;//CHANAAAAAAAAAAAAAGEGGEEEEEEEEEEEEEEEEEE//
//             conn.query(sqlStatement, [content, rating, userid, gameid], (err, result) => {//CHANAAAAAAAAAAAAAGEGGEEEEEEEEEEEEEEEEEE//
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else {
//                     var test = 'SELECT reviewid FROM reviews ORDER BY reviewid DESC LIMIT 1;'
//                     conn.query(test, (err, res) => {
//                         conn.end();
//                         if (err) {
//                             console.log(err);
//                             return callback(err, null);
//                         } else {
//                             return callback(null, res)
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }
//endpoint 11
// review.getReviewById = (id, callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement =
//                 `
//             SELECT reviews.game_id, reviews.content, reviews.rating, userinfo.username, reviews.created_at
//             FROM reviews
//             INNER JOIN userinfo
//             ON reviews.user_id = userinfo.userid
//             WHERE reviews.game_id = ?;
//             `;
//             conn.query(sqlStatement, [id], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else if (result.length > 0 ) {
//                     return callback(null,result)
//                 } else {
//                     var gameName = `SELECT title FROM games where game_id = ?`
//                     conn.query(gameName, [id], (err, res) => {
//                         conn.end();
//                         if (err) {
//                             console.log(err);
//                             return callback(err, null);
//                         } else {
//                             return callback(null, res)
//                         }
//                     })
//                 }
//             })
//         }
//     })
// }





//----------------------------------------------get review---------------------------------------------------
review.getReviewById = (id, callback) => {
    console.log("Connected to backend .getReviewByID");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            SELECT reviews.*, userinfo.username,userinfo.picurl
            FROM reviews
            INNER JOIN userinfo
            ON reviews.user_id = userinfo.userid
            WHERE reviews.game_id = ?
            ORDER BY reviews.reviewid DESC;
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /platform: " + result.length);
                    return callback(null, result)
                }
            })
        }
    })
}


//----------------------------------------post review-------------------------------------    

review.insertNewReview = (content, rating, userid, gameid, callback) => {
    console.log("Connected to backend .insertnewReview");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement = `Insert into reviews (content,rating,user_id,game_id) values (?,?,?,?)`;
            conn.query(sqlStatement, [content, rating, userid, gameid], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /platform: " + result.length);
                    return callback(null, result)
                }
            })
        }
    })
}
//---------------------------get average review---------------------------------------------------
review.getAverageReviewByID = (id, callback) => {
    console.log("Connected to backend .getAverageREviewID");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            SELECT AVG(rating) as rating from reviews where game_id = ?
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getAverageReviewByID: " + result.length);
                    return callback(null, result)
                }
            })
        }
    })
}
//---------------------------get uderid review---------------------------------------------------
review.getUserFromReview = (id, callback) => {
    console.log("Connected to backend .getUserFromReview");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            SELECT user_id from reviews where game_id = ?
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getUserFromReview: " + result.length);
                    return callback(null, result)
                }
            })
        }
    })
}
//-------------------------------update review--------------------------------
review.editReview = (content, rating, userid,gameid, callback) => {
    console.log("Connected to backend .editReview");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement = `UPDATE reviews SET content=? ,rating=? WHERE user_id =? AND game_id=?`;
            conn.query(sqlStatement, [content, rating, userid,gameid], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /platform: " + result.length);
                    return callback(null, result)
                }
            })
        }
    })
}

module.exports = review;

