const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
const jquery = require("jquery")(dom.window);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/Signup.html");

});

app.post("/",function(req,res){
    const firstname = req.body.first;
    const lastname = req.body.last;
    const emailid = req.body.mail;
   

    const data = {
        members :[
            {
                email_address: emailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }

 const jsonData = JSON.stringify(data);
 const url = "https://us6.api.mailchimp.com/3.0/lists/fd5cc9cc9f"

 const options = {
     method: "POST",
     auth: "sonali31:3cb6ca1cacb46272463370880679d1f9-us6"
 }

const request =  https.request(url,options,function(response){
    //res.sendFile(__dirname+"/Success.html");
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/Success.html");}
    else{
      res.sendFile(__dirname + "/Failure.html");}
   response.on("data",function(data)
      {
           console.log(JSON.parse(data));
      });
 });


request.write(jsonData);
request.end();

});

app.post("/Failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running at port 3000");
});

//API KEY  3cb6ca1cacb46272463370880679d1f9-us6
//LIST KEY fd5cc9cc9f