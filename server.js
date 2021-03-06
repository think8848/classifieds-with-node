var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var UserController = require('./controllers/UserController');

mongoose.connect(config.database, function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

/*mongoose.connection.on('error', function (error) {
    console.log("MongoDB error");
});*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

// todo: додати 404 сторінку замість " app.get('*',... "
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

// uploading images to /public/images
app.post('/uploads', multipartyMiddleware, UserController.uploadFile);

app.listen(config.port, function (err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.port);
    }
});
