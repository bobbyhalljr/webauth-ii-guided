const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfig = {
  name: 'ohforsho', // default would be "sid"
  secret: 'keep it secret, and safe!', // secret on env in production, use env variable
  cookie: {
    httpOnly: true, // JS cannot access cookies
    maxAge: 1000 * 60 * 60, // = 1 hour, experiation time in milliseconds
    secure: false, // process.env.NODE_ENV === production ? true : false,  
  // should be true in production, false during development
  },
  resave: false,
  saveUninitialized: true, // set to false during production, GDPR compliance about cokkies
}

server.use(sessions(sessionConfig)) // turn on sessions support
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
