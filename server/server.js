import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import model from './routes/model.js';
const app = express();

// set our port
const port = process.env.PORT || 8081;

app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(process.cwd() + '/app/public'));

// require('./app/routes')(app); // configure our routes
app.route('/').get(function (req, res) {
    res.sendFile(path.join(process.cwd(), 'app/index.html'));
  });

// Load routes
model(app);

app.listen(port);

console.log('Listening on localhost:', port);
export default app;
