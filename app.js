const express = require('express');
const app = express();
const port = 3000
const bodyParser = require("body-parser");
const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

  //  res.send("the express server is on");

  res.sendFile(__dirname + '/signup.html');

})

app.post("/", function (req, res) {

  var firstNam = req.body.firstName;
  var lastNam = req.body.lastName;
  var emails = req.body.email;

  console.log(firstNam, lastNam, emails);

  const url = "https://us7.api.mailchimp.com/3.0/lists/821d612274"
  var data = {
    members: [
      {
        email_address: emails,
        status: "subscribed",
        merge_fields: {
          FNAME: firstNam,
          LNAME: lastNam,

        }
      }

    ],

  };


  var jsonData = JSON.stringify(data);
  var options = {

    method: 'POST',
    auth: "samujs:4d34a4d6cb2eeabd862b3bd958f6af95-us7"


  };

  var request = https.request(url, options, function (response) {


    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    }
    else {

      res.sendFile(__dirname + "/failure.html")
    }



    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })



  });


  request.write(jsonData);
  request.end();

  //res.send();


});


app.post('/failure', function(req, res){

  res.redirect("/");
})










//audience id
//821d612274
//821d612274

//apikey
//4d34a4d6cb2eeabd862b3bd958f6af95-us7




app.listen(port, function () {
  console.log("listening on port" + port);
})