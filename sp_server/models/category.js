var db = require('./databaseConfig.js');

var cat = {}

//ENDPOINT 4
// cat.insertNewCat = (catName,catDesc,callback) => { 
//     var conn = db.getConnection()
//     conn.connect((err)=>{
//         if (err) {
//             console.log(err);
//             return callback(err,null);
//         } else {
//             var sqlStatement = 'Insert into gamecat (cat_name,cat_desc) values (?,?) '
//             conn.query(sqlStatement,[catName,catDesc],(err,result)=>{
//                 conn.end();
//                 if (err){
//                     console.log(err);
//                     return callback(err,null);
//                 }else {
//                     return callback(null,result);
//                 }
//             })
//         }
//     }
//     )
// }

//ENDPOINT 5
// cat.updateCatByID = (cat,catID,callback) => { 
//     var conn = db.getConnection()
//     conn.connect((err)=>{
//         if (err) {
//             console.log(err);
//             return callback(err,null);
//         } else {
//             var sqlStatement = 'UPDATE gamecat SET cat_name = ? ,cat_desc = ? WHERE cat_id = ?'
//             conn.query(sqlStatement,[cat.catName,cat.catDesc,catID],(err,result)=>{
//                 conn.end();
//                 if (err){
//                     console.log(err);
//                     return callback(err,null);
//                 }else {
//                     return callback(null,result);
//                 }
//             })
//         }
//     }
//     )
// }


//-----------------------------------INSERT NEW CAT-----------------------------------------
cat.insertNewCat = (catName,catDesc,callback) => { 
    var conn = db.getConnection()
    conn.connect((err)=>{
        if (err) {
            console.log(err);
            return callback(err,null);
        } else {
            var sqlStatement = 'Insert into gamecat (cat_name,cat_desc) values (?,?) '
            conn.query(sqlStatement,[catName,catDesc],(err,result)=>{
                conn.end();
                if (err){
                    console.log(err);
                    return callback(err,null);
                }else {
                    return callback(null,result);
                }
            })
        }
    }
    )
}





module.exports=cat;