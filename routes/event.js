const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.post('/event', async (req, res, next) => {
  const { title, description, date, location } = req.body;
  // console.log(typeofowner, 'que es esto');
  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
    });
    return res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
