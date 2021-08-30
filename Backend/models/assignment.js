const mongoose = require("mongoose");

const AssignmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Assignment name is required"],
  },
  description: {
    type: String,
  },
  postedTime: {
    type: Date,
    required: [true, "Assignment post-date is required"],
  },
  dueTime: {
    type: Date,
    required: [true, "Assignment due-date is required"],
  },
  maxMarks: {
    type: Number,
    required: [true, "Assignment max number is required"],
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

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignment;
