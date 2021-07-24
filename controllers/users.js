const userRoute = require('express').Router();

const { issueJWT } = require('../utils/auth');
const users = require('../services/users');

userRoute.post('/register', (req, res) => {

});

userRoute.post('/login', (req, res) => {
  users.getUserById('brian');
  res.send('hi');
});

module.exports = userRoute;
