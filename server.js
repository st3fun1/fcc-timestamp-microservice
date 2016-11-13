var express = require('express');
var path = require("path");
var moment = require('moment');

var app = express();

app.set("views",path.join(__dirname,'/public/template'));
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,'/public/template')));

app.get('/',function(req,res,next){
  res.render("index",{action:"Unix Timestamp and Natural Language"});
  next();  
});


app.get('/:date', function (req, res) {
  var reqDate = req.params.date;
  var isValidDate = moment(reqDate,null,true).isValid();
  var msg;
  if(isValidDate){
    var unixDate =  new Date(reqDate).getTime()/1000;
    var naturalDate = reqDate;
    var resObj = {
      "unix": unixDate,
      "natural": naturalDate
    };
    msg = JSON.stringify(resObj);
  } else {
    msg = "Invalid date format!";
  }
  res.render("index",{action:msg});
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
