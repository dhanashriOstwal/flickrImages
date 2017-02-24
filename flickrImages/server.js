const express = require('express');
const bodyParser= require('body-parser');
const app = express();
var path = require('path');
var https = require('https');

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static('public'));
app.use(bodyParser.json());                                     // parse application/json
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//flickr details
var optionsget = {
    host : 'api.flickr.com', // here only the domain name
    path : '/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};

//first page rendered (the page which says "NASA Image Gallery")
app.get('/',function(req,res){
    res.render('pages/firstPage');
    console.log(req.body);
}); 

//second page rendered
app.get('/images', function (req, res) { 	
	res.render('pages/index');
	console.log(req.body);
});

//sends data to the front end in JSON format
app.get('/flickr', function (req2, res) {
    var responseString = '';
    var responseObject = '';
    
    var req = https.request(optionsget, function(res2) {
        res2.on('data', function(d) {
            responseString += d;
        });
        res2.on('end', function() {
            res.send(responseString);
        });
    });
    req.on('error', function(e) {
      console.error(e);
    });
    req.end();
});
  
//starts the server
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});