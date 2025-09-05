const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  
  messageId: {
    type: String,
    require: true,
    unique: true,
  },
  account: {
    type: String,
    require: true,
  },
  folder: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
  },
  sender: {
    type: String,
    require: true,
  },
  receivedAt: {
    type: Date,
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("Emails", emailSchema);