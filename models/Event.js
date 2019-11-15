const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: String,
    date: String,
    location: String,
    description: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
