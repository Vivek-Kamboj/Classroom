const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Test name is required"],
  },
  description: {
    type: String,
  },
  postedTime: {
    type: Date,
    required: [true, "Test post-date is required"],
  },
  dueTime: {
    type: Date,
    required: [true, "Test due-date is required"],
  },
  maxMarks: {
    type: Number,
    required: [true, "Test max number is required"],
  },
  studentResponses: [
    {
      studentRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Response-student is required"],
        unique: true,
      },
      responseLink: {
        type: String,
        required: [true, "Response-link is required"],
      },
      marks: {
        type: Number,
      },
      submittedTime: {
        type: Date,
      },
    },
  ],
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
