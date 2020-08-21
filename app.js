const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
var hbs = require('express-handlebars');
const dotenv = require('dotenv');

const router = require('./routes/router');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'))
app.set('partials', path.join(__dirname, 'views/partials'))
app.set('view engine', 'hbs'); 

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'index',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

app.get('/', router.home);
app.get('/404', router.send404);

app.get('*', (req, res) => {
    res.redirect('/404');
});

console.log('Listening on port ', process.env.PORT || 3000 );
app.listen(process.env.PORT || 3000)