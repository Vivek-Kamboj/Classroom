const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: [true, "Subject code is required"],
    unique: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Subject teacher is required"],
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
