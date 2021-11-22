const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const fs = require('fs') //extra module

const user = require("../models/users");
const cat = require("../models/category")
const games = require("../models/games.js");
const review = require("../models/review");



var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json());


const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../auth/config");

const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");
const { json } = require("body-parser");
const verifyAdmin = require("../auth/verifyAdmin");

const resetA = "\n\n_____________________________________\n|                                   |\n"
const space = "     "

const resetB = "\n|                                   |\n|___________________________________|\n\n"


//------------------------------------------------------------WEB APIS----------------------------------------------


//---------------------------------------LOGIN-------------------------------------
app.post("/login/", (req, res) => {
    console.log(`${resetA} ${space}LAUCNHING /LOGIN API ${resetB}`);

    user.checkLogin(
        req.body.username,
        req.body.password,
        (error, user) => {
            if (error) {
                next(error);
                return;
            }
            if (user === null) {
                res.status(401).send();
                return;
            }
            const payload = { user_id: user[0].userid, role: user[0].role }; //payload send role
            console.log("data raw " + JSON.stringify(user));
            jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                }
                res.status(200).send({
                    token: token,
                    user_id: user[0].userid,
                    role: user[0].role,
                });
            })
        });
});


//---------------------------------REGISTER--------------------------
app.post('/register/', (req, res) => {
    console.log(`${resetA} LAUNCHING /REGISTER API ${resetB}`);
    var { username, email, password, role, picurl } = req.body
    user.insertNewUser(username, email, password, role, picurl, (err, result) => {
        if (!err) {
            res.status(201).send(result[0]);
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});


//-------------------------GET GAMES FOR HOMEPAGE---------------------------------
app.get('/getGames', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getGames API ${resetB}`);
    games.getGames((err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});


//------------------------------------------GET GAMES SEARCH------------------------------------
app.get('/getGamesBySearch/:search', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getGamesBySearch/:search API ${resetB}`);
    const search = req.params.search
    games.getGamesBySearch(search, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-----------------------get platforms for dropdown------------------------------
app.get('/platform', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /platform API ${resetB}`);
    games.getPlatforms((err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-------------------------------------Get games by platform-------------------------
app.get('/getGameByPlatform/:platform', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getGameByPlatform/:platform API ${resetB}`);
    const platform = req.params.platform;
    games.getGamesByPlatform(platform, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
}
);

//---------------------------game details----------------------------------------
app.get('/game/:game_id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /game/:game_id API ${resetB}`);
    const game_id = req.params.game_id
    games.getGamesByID(game_id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//------------------------------getReviewByID-----------------------------------
app.get('/review/:id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /review/:id API ${resetB}`);
    const id = req.params.id;
    review.getReviewById(id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-------------------------new review--------------------------------------------
app.post('/newReview', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /newReview API ${resetB}`);
    const { content, rating, uid, gid } = req.body
    review.insertNewReview(content, rating, uid, gid, (err, result) => {
        if (!err) {
            console.log("result length in API " + result);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-----------------------GET CATEORIES-----------------------------------------
app.get('/getCat', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getCat API ${resetB}`);
    games.getCat((err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-------------------------INSERT NEW GAME------------------------------------------
app.post('/insertGame',verifyAdmin, (req, res,next) => {
    console.log(`${resetA} ${space}LAUNCHING /insertGame API ${resetB}`);
    var { title, description, price, platform, categoryid, year } = req.body
    games.insertNewGame(title, description, price, platform, categoryid, year, (err, result) => {
        if (!err) {
            res.status(201).send(result)
        } else if (err.code == "ER_DUP_ENTRY") {
            res.status(422).send({ "Error": "Unprocessable Entity" });
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-------------------------------ADD NEW CATEGORY---------------------------------------
app.post('/insertCategory', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /insertCategory API ${resetB}`);
    var { catName, catDesc } = req.body
        cat.insertNewCat(catName, catDesc, (err, result) => {
            if (!err) {
                res.status(204).send()
            } else if (err.code == "ER_DUP_ENTRY") {
                res.status(422).send({ "Error": "Unprocessable Entity" });
            } else {
                res.status(500).send({
                    "Result": "Internal Server Error"
                });
            }
        });
    }
);

//-------------------------------------Get games by platform-------------------------
app.get('/getGamesByPrice/:price', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getGamesByPrice/:price${resetB}`);
    const price = req.params.price;
    games.getGamesByPrice(price, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
}
);

//------------------------------get AVG REVIEW-----------------------------------

app.get('/getAverageReviewByID/:id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getAverageReviewByID/:id API ${resetB}`);
    const id = req.params.id;
    review.getAverageReviewByID(id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});
//------------------------------get USERID FROM REVIEW----------------------------------

app.get('/getUserFromReview/:id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getUserFromReview/:id API ${resetB}`);
    const id = req.params.id;
    review.getUserFromReview(id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//---------------------------------updateREview--------------------------------------------
app.put('/updateReview', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /newReview API ${resetB}`);
    const { content, rating, uid, gid } = req.body
    review.editReview(content, rating, uid, gid, (err, result) => {
        if (!err) {
            console.log("result length in API " + result);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//------------------------------------delete game--------------------------------------------
app.delete('/game/:id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /game/:id API ${resetB}`);
    const id = req.params.id;
    games.deleteGamesById(id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(204).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//-------------------------GET Games to delete---------------------------------
app.get('/getOnlyGames', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /getOnlyGames API ${resetB}`);
    games.getGames((err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//---------------------------game details----------------------------------------
app.get('/gameWithCat/:game_id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /gameWithCat/:game_id API ${resetB}`);
    const game_id = req.params.game_id
    games.getGamesByIDWithCat(game_id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(200).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});

//----------------------------------------EDIT GAMES---------------------------------------
app.put('/game/:id', (req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /game/:id API ${resetB}`);
    const id = parseInt(req.params.id);
    var { title, description, price, platform, category_id, year } = req.body
    games.updateGameById(title, description, price, platform, category_id, year, id, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(204).send(result)
        } else {
            res.status(500).send({
                "Result": "Internal Error"
            });
        }
    });

});

//---------------------------------------------ADMIN ENDPOINT---------------------------------
app.post('/adminReg/', verifyAdmin,(req, res) => {
    console.log(`${resetA} ${space}LAUNCHING /game/:id API ${resetB}`);
    var { username, email, password, role, picurl } = req.body
    user.insertNewUser(username, email, password, role, picurl, (err, result) => {
        if (!err) {
            console.log("result length in API " + result.length);
            res.status(201).send(result[0]);
        } else {
            res.status(500).send({
                "Result": "Internal Server Error"
            });
        }
    });
});
module.exports = app;