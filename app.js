const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


const employee = require('./routes/employee.route');


const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://admin:admin123@clusterreza-aml5t.mongodb.net/test?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/employees', employee);

let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});





















