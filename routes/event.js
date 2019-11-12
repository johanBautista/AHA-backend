const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

router.post('/events', async (req, res, next) => {
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

router.get('/events', async (req, res, next) => {
  try {
    const event = await Event.find();
    return res.json(event);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

module.exports = router;
