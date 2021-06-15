

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db.js');
const bcrypt = require('bcrypt');
const server = express();
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { SESSION_SECRET, PROD_ACCESS_TOKEN} = process.env
const mercadopago = require ('mercadopago');
const cors = require('cors')

server.name = 'API';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true
}

server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', session: false },
  async (email, password, done) => {
    
    const user = await User.findOne({ where: { email: email } })
    console.log(user)
    if (!user) return done(null, false)
    if (!user.compare(password)) return done(null, false);
    if (!user.active) return done(null, false)
    const { id, userName, firstName, lastName, email: userEmail, role, resetPassword, active } = user;
    console.log(user + 'hola')
    return done(null, {
      id,
      userName,
      firstName,
      lastName,
      email: userEmail,
      role,
      resetPassword,
      active
    })
  }
));

passport.use(new BearerStrategy((token, done) => {
  console.log('entre a la estrategia')
  jwt.verify(token, SESSION_SECRET, function (err, user) {
    
    if (err) return done(err);
    return done(null, user ? user : false)
  })
}))

server.use(passport.initialize());

server.all('*', function (req, res, next) {
  passport.authenticate('bearer', function (err, user) {
    
    if (err) return next(err);
    if (user) {
      req.user = user
    }
    return next()
  })(req, res, next)
})

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN
});

server.post("/checkout", cors(), (req, res) =>{
  let preference = {
      items: [
        {
          title: 'Mi producto',
          unit_price: 100,
          quantity: 1,
        }
      ],
      back_urls: {
        "success": "http://localhost:3000/feedback",
        "failure": "http://localhost:3000/feedback",
        "pending": "http://localhost:3000/feedback"
      },
      auto_return: 'approved',
     
    };
    
    mercadopago.preferences.create(preference)
    .then(function(response){

      // console.log(response.body)
      res.json(response.body.init_point)

    }).catch(function(error){
      console.log(error);
    });
    
})



server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;