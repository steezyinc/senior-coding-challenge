const userRoute = require('express').Router();

const { body, validationResult } = require('express-validator');
const { MD5 } = require('crypto-js');

const { issueJWT, hashPassword, passwordIsVerified } = require('../utils/auth');
const { verifyAuth } = require('../middlewares/verifyAuth');
const users = require('../services/users');

userRoute.post(
  '/register',
  body('email').exists().normalizeEmail().isEmail(),
  body('password').exists().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const hashedEmail = MD5(email).toString();

    // for poc simplicity, i just fetch the doc instead of checking for existance
    const emailExists = await users.getUserById(hashedEmail);

    if (emailExists) {
      return res.status(409).json({ message: 'email is already registered' });
    }

    const hashedPassword = await await hashPassword(password);

    await users.createNewUser(hashedEmail, {
      email,
      hashedPassword,
    });

    return res.status(201).json({ message: 'user registraton successful' });
  },
);

userRoute.post(
  '/login',
  body('email').exists().normalizeEmail().isEmail(),
  body('password').exists().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const hashedEmail = MD5(email).toString();

    const user = await users.getUserById(hashedEmail);
    const { hashedPassword } = user;

    const isValidPassword = await passwordIsVerified(password, hashedPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'invalid password' });
    }

    const jwt = issueJWT(hashedEmail);

    return res.status(200).json({
      message: 'login successful',
      jwt,
    });
  },
);

userRoute.post(
  '/progress',
  verifyAuth,
  async (req, res) => {
    const { videoId, videoDuration } = req.body;
    const { id } = res.locals.user;
    await users.checkUserProgress(id, videoId, videoDuration);
    return res.status(200).json({ message: 'OK' });
  },
);

userRoute.put(
  '/progress',
  verifyAuth,
  async (req, res) => {
    const { videoId, time, pausedTotal } = req.body;
    const { id } = res.locals.user;
    await users.updateProgress(id, videoId, time, pausedTotal);
    return res.status(200).json({ message: 'OK' });
  },
);

userRoute.get(
  '/progress',
  verifyAuth,
  async (req, res) => {
    const { classIds } = req.query;
    const classIdsList = classIds.split(',');
    const { id } = res.locals.user;
    const classProgressList = await users.getUserProgress(id, classIdsList);
    return res.status(200).json({ classProgressList });
  },
);

module.exports = userRoute;
