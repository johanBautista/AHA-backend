const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    text: { type: String, required: true, unique: true },
    // owner: { type: ObjecId, ref: 'User', unique: true },
    date: { type: Date },
    location: { type: String },
    theme: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Quote = mongoose.model('Quote', userSchema);

module.exports = Quote;
