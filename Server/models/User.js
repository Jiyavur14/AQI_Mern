const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const JournalEntrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  aqi: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
}, { _id: false });

const CityWatchlistSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  PM25: { type: String },
  PM10: { type: String },
  NO2: { type: String },
  SO2: { type: String },
  CO: { type: String },
  O3: { type: String },
  lastUpdated: { type: String }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  state: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  Threshold: {
    type: String,
    default: '150'
  },
  journalEntries: {
    type: [JournalEntrySchema],
    default: []
  },
  cityList: {
    type: [CityWatchlistSchema],
    default: []
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});


// Compare password method
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
