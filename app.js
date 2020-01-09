var mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    bodyParser = require("body-parser")
var signinid = null

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static('public'))
    
app.listen(8000, function() {
    console.log("server started")
})


var userSchema = mongoose.Schema({
    name: String,
    username: String,
    emailID: String,
    password: String
})

var User = mongoose.model("User", userSchema)

app.get("/", function (req, res) {
    // User.findById(signinid, function (err, signeduser) {  
    //     console.log("home page started")
        res.render("home.ejs"); 
    //})
})


app.get("/signup", function (req, res) {
    res.render("signup")
})

app.post("/signup", function (req, res) {
    var name = req.body.name
    var password = req.body.password
    var emailID = req.body.email
    var username = req.body.username
    var newUser = {
        username: username,
        name: name,
        password:password,
        emailID:emailID
    }
    User.create(newUser, function (err, res) {
        if (err) {
            res.render("error")
        }
        else {
            res.redirect("thanks")
        }
    })
})

app.get("/signin", function (req, res) {
    res.render("signin")
})

app.post("/signin", function (req, res) {  
    var checkUser = {
        username: req.body.username,
        password: req.body.password
    }
    User.find({username: checkUser.username}, function (err, founduser) {  
        if (err) {
            console.log("error")
        }
        else if (founduser === null) {
            console.log("user doen't have an account yet")
            res.redirect("/signin")
        }
        else if (founduser.password === checkUser.password){
            signinid = founduser._id
            res.redirect("/")
        }
    })
})


