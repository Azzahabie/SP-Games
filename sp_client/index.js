const serveStatic = require('serve-static');
const express = require("express");
const app = express();



//--------------------HOMEPAGE-------------------------------
app.get("/testH", (req, res) => {
  res.sendFile("/public/sp_html/detailedgame.html", { root: __dirname });
});
//--------------------TESTHOMEPAGE-------------------------------
app.get("/", (req, res) => {
  res.sendFile("/public/sp_html/HomePage.html", { root: __dirname });
});

//------------------------------------REGISTER----------------------------------
app.get("/register", (req, res) => {
  res.sendFile("/public/sp_html/register.html", { root: __dirname });
});

//----------------------------------LOGIN--------------------------------------
app.get("/login/", (req, res) => {
  res.sendFile("/public/sp_html/login.html", { root: __dirname });
});

//-------------------------GAME DETAIL-------------------------------------------------
app.get("/game/:game_id", (req, res) => {
  res.sendFile("/public/sp_html/gameDetail.html", { root: __dirname });
});

//------------------------ADMINPAGE--------------------------------------------------------
app.get("/adminPage", (req, res) => {
  res.sendFile("/public/sp_html/adminPage.html", { root: __dirname });
});
//------------------------ADMINPAGE--------------------------------------------------------
app.get("/adminRegister", (req, res) => {
  res.sendFile("/public/sp_html/adminRegister.html", { root: __dirname });
});

//---------------------------Game Control -------------------------------------------
app.get("/gameControl", (req, res) => {
  res.sendFile("/public/sp_html/gameControl.html", { root: __dirname });
});
//---------------------------CAT Control -------------------------------------------
app.get("/addCat", (req, res) => {
  res.sendFile("/public/sp_html/addCat.html", { root: __dirname });
});
//---------------------------edit Game Control -------------------------------------------
app.get("/editGame/:gameid", (req, res) => {
  res.sendFile("/public/sp_html/editGame.html", { root: __dirname });
});

//------------------------------TEST CODE------------------------------------------
app.get("/missing", (req, res) => {
  res.sendFile("/public/sp_html/missing.html", { root: __dirname });
});






app.use(serveStatic(__dirname + "/public"));

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});











// //--------------------------defuq is this---------------------------------
// app.get("/users/:id", (req, res) => {
//   res.sendFile("/public/user.html", { root: __dirname });
// });

// app.get("/users/", (req, res) => {
//   res.sendFile("/public/users.html", { root: __dirname });
// });