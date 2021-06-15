const server = require("express").Router();
const passport = require("passport");
const { User } = require("../db.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SESSION_SECRET } = process.env;

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});



server.post('/login', function (req, res, next) {
    passport.authenticate('local', { failureRedirect: '/logIn' }, function (err, user) {
        console.log(user)
        if (err) return next(err);
        else if (!user) return res.sendStatus(401)
        else {
            const token = jwt.sign(user, SESSION_SECRET)
            const data = {
                token: token,
                user: user
            }
            return res.send(data)
        }
    })(req, res, next)
})


server.post("/logout", (req, res) => {
  console.log(req.user);
  if (req.user) {
    return res.sendStatus(200);
  }
});

// server.post("/login", cors(), (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         console.log("volvi de passport")
//         if (err) { return next(err); }
//         if (!user) {
//             console.log("volvi de passport2")
//             return res.send(user);
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 console.log("volvi de passport3")
//                 return next(err);
//             }
//             console.log(req.session);
//             console.log(req.user);
//             return res.send(user)
//         });
//     })(req, res, next);
// })

// server.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function (req, res) {
//         console.log("volvi de passport")
//         console.log(req.session);
//         console.log(req.user);
//         console.log(req.isAuthenticated())
//         res.status(200).send();
//         return res.send(user)
//     });

// server.post('/login', passport.authenticate('local'), (req, res) => {
//     res.send(req.user);
// });

// server.post('/logout', cors(), (req, res) => {
//     console.log(req.isAuthenticated())
//     if (req.isAuthenticated()) {
//         console.log(req.session);
//         console.log(req.user);
//         req.logout();
//         console.log(req.session);
//         console.log(req.user);
//         console.log('hola')
//         res.sendStatus(200);
//     }
//     else res.status(400).send('No estabas logueado');
// });

module.exports = server;
