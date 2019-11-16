const express = require("express");
const Event = require("../models/Event");

const router = express.Router();


// ------------------------------------------------------------ crear evento
router.post('/events', async (req, res, next) => {
  const { title, description, date, location } = req.body;
  const { currentUser:{ _id }} = req.session;
  console.log(_id);
  
  // console.log(typeofowner, 'que es esto');
  try {
    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      owner: _id,
    });
    return res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

// ------------------------------------------------------------ listar mis eventos creadas userHome
router.get('/events/user/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.find({ owner: id });
    return res.json(event);
  } catch (error) {
    next(error);
  }
});

// ------------------------------------------------------------ listar todos los events creados
router.get('/events', async (req, res, next) => {
  try {
    const event = await Event.find();
    return res.json(event);
  } catch (error) {
    next(error);
  }
  // req.flash('prueba de lisatado'); PENSAR EN LA FORMA DE HACER NOTIFICACIONES
});

// ------------------------------------------------------------ borrar events
router.delete('/events/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Event.findByIdAndDelete(id);
    return res.json(deleted);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
