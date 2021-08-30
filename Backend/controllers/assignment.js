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

const assList=async(req, res)=>{
  try {
    await db.Subject.findOne({ _id: req.query.subjectId }).populate("assignments").exec(
      function (err, subject) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message:
              "Something went wrong when trying to get assignment details",
          });
        } else {
          res.status(200).json(subject.assignments);
        }
      }
    );
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get assignment details",
    });
  }
}

const response=async(req, res)=>{
  var response = { ...req.body, marks: null };
  var ass=req.params.assignmentId;
  if (
    !response.studentId ||
    !response.link ||
    !response.time 
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    var newResponse={
      studentRef: response.studentId,
      responseLink: response.link,
      marks: response.marks,
      submittedTime: response.time,
    }
    try {
      await db.User.findById(response.studentId).exec(async(err, student)=>{
        if(err){
          return res.status(500).json({
            message: "Something went wrong while submitting response. Try again!",
          });
        }
        await db.Assignment.findById(ass).exec(async(err, foundAssignment)=>{
          if(err){
            return res.status(500).json({
              message: "Something went wrong while submitting response. Try again!",
            });
          }

        var responses=[];
        if(foundAssignment.studentResponses){
        responses=[...foundAssignment.studentResponses];
      }
      for (let i = 0; i < responses.length; i++) {
        if(responses[i].studentRef.toString()=== student._id.toString()){
          return res.status(200).json({
            message: "Already responded!",
          });
        }
      }
        responses.push(newResponse);
        foundAssignment.studentResponses=responses;
        foundAssignment.save((err)=>{
          if(err){
            return res.status(500).json({
              message: "Something went wrong while submitting response. Try again!",
            });
          }
          res.status(200).json({
            message: "Response Added",
          });
        })
      })

    })

  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while submitting response. Try again!",
    });
  }

}

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
  assList,
  response,
  update,
  deleteAssignment,
};
