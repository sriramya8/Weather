const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
  
});
app.post("/",function(req,res){
    const loc=req.body.place;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=c32b7b675aa77ea5eab02b1e7d35d96d&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata= JSON.parse(data);
            const des= weatherdata.weather[0].description
            const temp=weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
            const imageurl=" https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p> The weather is curently "+des+"</p>");
            res.write("<h1> The temperature in "+loc+" is currently "+temp+" degrees celcius </h1>");
            res.write("<img src="+imageurl+">");
            res.send();    
    });
    
});

})

app.listen(3000,function(){
    console.log("server is listening from port 3000");
});
