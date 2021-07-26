const userRoute = require('express').Router();

const { query, validationResult } = require('express-validator');

const { verifyAuth } = require('../middlewares/verifyAuth');

const { getClasses, getTotalClassCount, getClassVideoUrlById } = require('../services/classes');

userRoute.get(
  '/',
  // verifyAuth,
  query('startAtKey').optional().isString(),
  query('includeTotal').optional().isBoolean().toBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startAtKey, includeTotal } = req.query;

    const operationsArray = [getClasses(startAtKey)];

    if (includeTotal) {
      operationsArray.push(getTotalClassCount());
    }

    const [classList, totalNumberOfClasses] = await Promise.all(operationsArray);

    const responseObject = {
      classList,
    };

    if (totalNumberOfClasses) {
      responseObject.totalNumberOfClasses = totalNumberOfClasses;
    }

    return res.status(200).json(responseObject);
  },
);

userRoute.get(
  '/:id/video-url',
  verifyAuth,
  async (req, res) => {
    const videoId = req.params.id;

    const requestedVideoUrl = await getClassVideoUrlById(videoId);
    return res.status(200).json({ videoUrl: requestedVideoUrl });
  },
);

module.exports = userRoute;
