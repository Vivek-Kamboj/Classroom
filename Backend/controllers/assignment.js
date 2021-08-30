const db = require("../models");

const create = async (req, res) => {
  var assignment = { ...req.body, studentResponses: [] };
  if (
    !assignment.name ||
    !assignment.postedTime ||
    !assignment.dueTime ||
    !assignment.maxMarks ||
    !assignment.subject
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    var subject=await db.Subject.findById(assignment.subject);
    // console.log(subject);
    const newAssignment = await db.Assignment.create(assignment);
      var ass=[];
      if(subject.assignments)
      ass=[...subject.assignments];
      ass.push(newAssignment);
      subject.assignments=ass;
      subject.save((err)=>{
        if(err){
          return res.status(500).json({
            message: "Something went wrong when creating a new Assignemnt",
          });
        }
        res.status(200).json(newAssignment);
      })
    


  } catch (err) {
    console.log("Server error.", err);
    return res.status(500).json({
      message: "Something went wrong when creating a new Assignemnt",
    });
  }
};

const get = async (req, res) => {
  try {
    await db.Assignment.findOne({ _id: req.params.assignmentId }).exec(
      function (err, assignment) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message:
              "Something went wrong when trying to get assignment details",
          });
        } else {
          res.status(200).json(assignment);
        }
      }
    );
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get assignment details",
    });
  }
};

const update = async (req, res) => {
  try {
    var updatedAssignment = await db.Assignment.findByIdAndUpdate(
      req.params.assignmentId,
      req.body
    );
    res.status(200).json(updatedAssignment);
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while updating assignment. Try again!",
    });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await db.Assignment.findByIdAndRemove(
      req.params.assignmentId
    );

    if (!deletedAssignment) {
      return res.status(500).json({
        message: "Assignment not found. Try again!",
      });
    }
    res.status(200).json({
      message: "Successfully deleted the Assignment.",
    });
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while deleting Assignment. Try again!",
    });
  }
};

module.exports = {
  create,
  get,
  update,
  deleteAssignment,
};
