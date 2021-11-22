//core 
const { get } = require('../controller/app.js');
var db = require('./databaseConfig.js');
//other core
var games = {}

//ENDPOINT 6
// games.insertNewGame = (title, description, price, platform, category_id, year, callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement = 'INSERT INTO games (title,description,price,platform,cat_id,year) values (?,?,?,?,?,?)';
//             conn.query(sqlStatement, [title, description, price, platform, category_id, year], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return callback(err, null);
//                 } else {
//                     var test = 'SELECT game_id FROM games order by game_id DESC LIMIT 1;'
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

//ENDPOINT 7

// games.getGamesByPlatform = (platformid, callback) => {
//     var conn = db.getConnection()
//     conn.connect((err) => {
//         if (err) {
//             console.log(err);
//             return callback(err, null);
//         } else {
//             var sqlStatement =
//                 `
//             SELECT games.game_id, games.title, games.platform, games.cat_id, gamecat.cat_name, games.year, games.created_at
//             FROM games
//             INNER JOIN gamecat
//             ON games.cat_id = gamecat.cat_id
//             WHERE games.platform = ?;
//             `;
//             conn.query(sqlStatement, [platformid], (err, result) => {
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



//------------------------------DELETE GAME WEB API------------------------------------------------
games.deleteGamesById = (id, callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            DELETE FROM games 
            WHERE game_id = ?
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            })
        }
    })
}

//----------------------------get all games--------------------------------
games.getGames = (callback) => {
    console.log("Connected to backend .getGames");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                'SELECT * FROM games order by game_id ;';
            conn.query(sqlStatement, (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getGames: " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}

//----------------------------game by searchbar--------------------------------
games.getGamesBySearch = (search, callback) => {
    console.log("Connected to backend .getGamesBySearch");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {

            var filter = ['%' + search + '%']
            var sqlStatement =
                'SELECT * FROM games WHERE title like ?'
            conn.query(sqlStatement, [filter], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getgamesbysearch/:search: " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}

//------------------------------------------game details--------------------------------
games.getGamesByID = (id, callback) => {
    console.log("Connected to backend .getGamesByID");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
            `
            SELECT *
            FROM games
            INNER JOIN gamecat
            ON games.cat_id = gamecat.cat_id
            WHERE games.game_id = ?;
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /game/:gameid: " + result.length);

                    return callback(null, result);
                }
            })
        }
    })
}
//----------------------------------homepage dropdown platform list-------------------------
games.getPlatforms = (callback) => {
    console.log("Connected to backend .getplatforms");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                'SELECT DISTINCT platform FROM games'
            conn.query(sqlStatement, (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /platform: " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}
//-----------------------------------------get game by platform-------------------------------
games.getGamesByPlatform = (platformid, callback) => {
    console.log("Connected to backend .getgamesbyplatform");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            SELECT *
            FROM games
            INNER JOIN gamecat
            ON games.cat_id = gamecat.cat_id
            WHERE games.platform = ?;
            `;
            conn.query(sqlStatement, [platformid], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getGameByPlatform/:platform: " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}

//----------------------------------GAME CATEGORY LIST-------------------------
games.getCat = (callback) => {
    console.log("Connected to backend .getCat");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                'SELECT cat_name, cat_id FROM gamecat ORDER BY cat_id DESC'
            conn.query(sqlStatement, (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /.getCat: " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}

//-------------------------------------------INSERT NEW GAME-----------------------------------
games.insertNewGame = (title, description, price, platform, category_id, year, callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement = 'INSERT INTO games (title,description,price,platform,cat_id,year) values (?,?,?,?,?,?)';
            conn.query(sqlStatement, [title, description, price, platform, category_id, year], (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    var test = 'SELECT game_id FROM games order by game_id DESC LIMIT 1;'
                    conn.query(test, (err, res) => {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, res)
                        }
                    })
                }
            })
        }
    })
}
//-----------------------------------------get game filter games by price-------------------------------
games.getGamesByPrice = (limiter, callback) => {
    console.log("Connected to backend .getGamesByPrice");
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
                `
            SELECT *
            FROM games
            INNER JOIN gamecat
            ON games.cat_id = gamecat.cat_id
            WHERE price < ?;
            `;
            conn.query(sqlStatement, [limiter], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /getGamesByPrice/:price " + result.length);
                    return callback(null, result);
                }
            })
        }
    })
}

//------------------------------------------game details--------------------------------
games.getGamesByIDWithCat = (id, callback) => {
    console.log("Connected to backend .getGamesByIDWithCat");
    console.log(id);
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var sqlStatement =
            `
            SELECT games.* , gamecat.cat_name
            FROM games
            INNER JOIN gamecat
            ON games.cat_id = gamecat.cat_id
            WHERE game_id = ?;
            `;
            conn.query(sqlStatement, [id], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("result length before passing to API /gameWithCat/:gameid: " + result.length);

                    return callback(null, result);
                }
            })
        }
    })
}

//---------------------------------------EDIT GAME BY ID ----------------------------------------
games.updateGameById = (title, description, price, platform, category_id, year, id, callback) => {
    var conn = db.getConnection()
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            var queryStatement =
                `UPDATE games
                SET
                title =?,
                description=?,
                price=?,
                platform=?,
                cat_id=?,
                year=?
                WHERE game_id=?`
            conn.query(queryStatement, [title, description, price, platform, category_id, year, id], (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    return callback(null, result);
                }
            })
        }
    })
}

module.exports = games;

