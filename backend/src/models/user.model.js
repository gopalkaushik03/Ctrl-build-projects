const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [String],
    interests: [String],
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    portfolioLinks: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);