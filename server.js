const express = require("express");
const app = express();
const port = process.env.PORT || 80;
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.urlencoded({extended:true}));
app.listen(port, () => {
    console.log("Server Is Started!");
});
mongoose.connect('db url', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=>{
    console.log("Connected!");
});

const contactStruc = new mongoose.Schema({
    name : String,
    email : String,
    message : String
});
const templateStruc = new mongoose.Schema({
    templateId : String,
    keywords : String,
    templateName : String,
    imgUrl : String,
    prevUrl : String,
    sourceUrl : String,
    description : String
});
var templateAPI = mongoose.model("templates", templateStruc);
const contact = mongoose.model("contact", contactStruc);
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.get("/aboutUs", (req, res) => {
    res.sendFile(__dirname+"/public/about.html");
});

app.get("/donateUs", (req, res) => {
    res.sendFile(__dirname+"/public/donate.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname+"/public/contact.html");
});

app.get("/search", (req, res) => {
    res.sendFile(__dirname+"/public/search.html");
});

app.get("/category", (req, res) => {
    res.sendFile(__dirname+"/public/category.html");
})



app.post("/contact", (req, res) => {
    var myArr = req.body;
    var data = new contact(myArr);
    data.save().then(res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,200&display=swap');
*{
    padding:0px;
    margin:0px;
    box-sizing: border-box;
}
body{
    font-family: 'Poppins', sans-serif;
}
        body{background:#59ABE3;margin:0}
form{width:400px;height:480px;background:#f2f2f2;border-radius:8px;box-shadow:0 0 40px -10px #000;margin:calc(50vh - 220px) auto;padding:20px 30px;max-width:calc(100vw - 40px);box-sizing:border-box;position:relative}
h2{margin:10px 0;padding-bottom:10px;width:180px;color:#78788c;border-bottom:3px solid #78788c}
input{width:100%;font-size: 17px;padding:10px;box-sizing:border-box;background:none;outline:none;resize:none;border:0;transition:all .3s;border-bottom:2px solid #bebed2}
input:focus{border-bottom:2px solid #78788c}
p:before{content:attr(type);display:block;margin:28px 0 0;font-size:14px;color:#5a5a5a}
button{position:absolute;left:50%;transform:translate(-50%);padding:8px 12px;margin:45px 0 0;font-size: 16px;border:2px solid #78788c;background:0;color:#5a5a6e;cursor:pointer;transition:all .3s}
button:hover{background:#78788c;color:#fff}
div{content:'Hi';bottom:-15px;right:-20px;background:#50505a;color:#fff;width:320px;padding:16px 4px 16px 0;border-radius:6px;font-size:13px;box-shadow:10px 10px 40px -14px #000}
span{margin:0 5px 0 15px}
@media screen and (max-width: 450px) {
    .div{
        width: 350px;
    }
    
}
    </style>
</head>
<body>
    <form class="div" method="post" action="/contact">
        <h2 style="color:green;"><small><small>Thanks For Submitting</small></small></h2>
        <p type="Name:"><input id="name" name="name" placeholder="Write your name here.."></input></p>
        <p type="Email:"><input id="email" name="email" placeholder="Let us know how to contact you back.."></input></p>
        <p type="Message:"><input id="mess" name="message" placeholder="What would you like to tell us.."></input></p>
        <button>Send Message</button>
    </form>
</body>
</html>`));
});


app.get("/temp", (req, res) => {
    res.sendFile(__dirname+"/public/temp.html");
});

app.post("/temp", (req, res) => {
    var data = req.body;
    data = new templateAPI(data);
    data.save().then(() => {
        console.log("Data Submitted!");
    });
});



app.get("/API", (req, res) => {
    templateAPI.find({}, (err, temp) => {
        res.send(temp);
    });
});

app.get("/product:id", (req, res) => {
    var item = req.path;
    item = item.replace("/product:", "");
    templateAPI.find({templateId : item}, (err, template) => {
        template = template[0];
        var name  = template['templateName'];
        var desc = template['description'];
        var imgUrl = template['imgUrl'];
        var sourceUrl = template['sourceUrl'];
        var prevUrl = template['prevUrl'];
        desc = desc.replace("Purple Fox Devs", "<a href='https://www.purplefoxdevs.tk'>Purple Fox Devs</a>");
        res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="CSS/template.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    
</head>
<body>
    <div class="header1">
        <div class="head">
            <span class="head1">Your Snips</span>
            <span class="dot"><big>.</big></span>
        </div>
        <i class="fa fa-search search-ico" onclick="goToSearch()"></i></div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-1">
                <h2 style="color: #222;font-size: 35px;" class="myH2">${name}</h2>
                <h3>Made By</h3>
                <p>${desc}</p>
                <h4 style="color:red;">*Free</h4>
                <button type="button" onclick="buttonClick()">Download Now<img src="IMG/arrow.png">
                </button>
            </div>
            <div class="col-2">
                <img src="${imgUrl}" class='myImg'/>
                <div class="color-box"></div>
                <div class="add-btn">
                    <img src='IMG/preview.png'/>
                    <p style="margin-right: 0px;margin-left: 5px;">Preview</p>
                </div>
            </div>
        </div>
    </div>
    <div class="ad">Ad Container</div>
    <script>
    function buttonClick() {
        window.location.href='${sourceUrl}';
    }
    function goToSearch() {
        window.location.href="/search";
    }
        </script>
</body>
</html>
        `);
    });
});

app.get("/searchOk:id", (req, res) => {
    var finalArr = new Array;
    var item = req.path;
    item = item.replace("/searchOk:", "");
    for(i = 0;i<=item.length;i++) {
        item = item.replace("%20", " ");
    }
    templateAPI.find({}, (err, tem) => {
        var l = tem.length;
        console.log(l);
        for(j=0;j<l;j++) {
            var thisArr = tem[j];
            var thisKey = thisArr['keywords'];
            if(!thisKey.includes(item)) {
                console.log("Search = ");
                tem[j] = "";
            }
        }
        res.send(tem);
        console.log(tem);
    });
});
