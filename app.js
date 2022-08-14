/* Welcome To main app */

const ex=require('express')
const exLayout=require('express-ejs-layouts')
const cookies=require('cookie-parser')
const app=ex()

//EJS
app.use(exLayout)
app.set('view engine', 'ejs' );

// Cookies
app.use(cookies())

// Declare the folder to express app
app.set("views","./views")
app.set("public","./public")
app.set("routes","./routes")

// Manage path Foders
app.use(ex.static(__dirname + '/public'));

//Bodyparser
app.use(ex.urlencoded ({ extended: false }));

// Routing
app.use("/",require("./routes/index"))

app.use("/login",require("./routes/login"))

app.use("/register",require("./routes/register"))

app.use("/home",require("./routes/home"))



// app Port
app.listen(8080)
