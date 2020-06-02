const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

var sess;
const config = require('./config/db');
mongoose.set('useCreateIndex', true);

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(' Connecté à la base de donnés ' + config.db);
}).catch(err => {
    console.log(err);
});

const app = express();

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static("./page"))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ 'extended': true }));
mongoose.Promise = global.Promise;


const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[2];

    require('./config/passport')(userType, passport);
    next();
};

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
     next(); 
    } 
   });

app.use(checkUserType);


const user = require("./controllers/user")
app.use('/api/user', user);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});