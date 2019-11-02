const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    text: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    // owner: { type: String },
    date: { type: String },
    location: { type: String },
    theme: { type: String },
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
// date debe estar como date no como string --ojo en modelo backend y en ruta-componen frontend