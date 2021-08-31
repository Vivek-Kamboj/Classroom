const db = require("../models");

const create = async (req, res) => {
  var subject = { ...req.body, students:[], assignments:[] };
  if (!subject.name || !subject.teacher || !subject.code) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    
    const newSubject = await db.Subject.create(subject);
    
    await db.User.findById(subject.teacher).exec(async(err, teacher)=>{
      if(err){
        return res.status(500).json({
          message: "Something went wrong when creating a new Subject",
        });
      }
      var subj=[];
      if(teacher.subjects){
        subj=[...teacher.subjects]
      }
      subj.push(newSubject);
      teacher.subjects=subj;
      await teacher.save((err)=>{
        if(err){
          return res.status(500).json({
            message: "Something went wrong when creating a new Subject",
          });
        }
      })

    })

    res.status(200).json(newSubject);
  } catch (err) {
    console.log("Server error.", err);
    return res.status(500).json({
      message: "Something went wrong when creating a new Subject",
    });
  }
};

const get = async (req, res) => {
  //   console.log(req.params.subjectId);
  try {
    await db.Subject.findOne({ _id: req.params.subjectId })
      .populate("teacher")
      .exec(function (err, subject) {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong when trying to get subject details",
          });
        } else {
          res.status(200).json(subject);
        }
      });
  } catch (err) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to get subject details",
    });
  }
};


const join = async(req, res)=>{
  const {code, studentId}=req.body;
  if(!code || !studentId){
    return res.status(400).json({ message: "Code is required" });
  }
  try {
    await db.Subject.findOne({code:code}).exec(async(err, subject)=>{
      if(err)
      {
        console.log(err);
        return res.status(500).json({
          message: "Something went wrong when trying to join a subject",
        });
      }
      await db.User.findById(studentId).exec(async(err,student)=>{
        if(err){
          console.log(err);
          return res.status(500).json({
            message: "Something went wrong when trying to join a subject",
          });
        }
        var studentsubj=[], subjectstudents=[];
        if(subject.students){
          subjectstudents=[...subject.students];
        }
        
        for (let i = 0; i < subjectstudents.length; i++) {
          if(subjectstudents[i].toString()=== student._id.toString()){
            return res.status(200).json({
              message: "Already joined subject",
            });
          }
        }
        subjectstudents.push(student);
        subject.students=subjectstudents;
          await subject.save((err)=>{
            if(err)
            {console.log(err);
            return res.status(500).json({
              message: "Something went wrong when trying to join a subject",
            });}
          });
        if(student.subject)
        {studentsubj=[...student.subject]}
        studentsubj.push(subject);
        student.subjects=studentsubj;
        await student.save((err)=>{
          if(err)
          {console.log(err);
          return res.status(500).json({
            message: "Something went wrong when trying to join a subject",
          });}
        })
        
        res.status(200).json({
          message:"Joined Subject",
        });
      })
    })
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong when trying to join a subject",
    });
  }
}

const update = async (req, res) => {
  try {
    var updatedSubject = await db.Subject.findByIdAndUpdate(
      req.params.subjectId,
      req.body
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.log("Server error.");
    return res.status(500).json({
      message: "Something went wrong while updating Subject. Try again!",
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await db.Subject.findByIdAndRemove(
      req.params.subjectId
    );

    if (!deletedSubject) {
      return res.status(500).json({
        message: "Subject not found. Try again!",
      });
    }
    var users=[];
    if(deletedSubject.students){
      users=[...deletedSubject.students]
    }

    users.push(deletedSubject.teacher);
    for(let i=0;i<users.length;i++){
      await db.User.findById(users.toString()).exec((err, user)=>{
        if(err){
          return res.status(500).json({
            message: "Something went wrong while deleting Subject. Try again!",
          });
        }
        var subj=[], newSubj=[];
        if(user.subject){
          subj=[...user.subjects];
        }
        for(let j=0;j<subj.length;j++){
          if(subj[j].toString()!==deletedSubject._id.toString()){
            newSubj.push(subj[j]);
          }
        }
        user.subjects=newSubj;
        user.save((err)=>{
          if(err){
            return res.status(500).json({
              message: "Something went wrong while deleting Subject. Try again!",
            });
          }
        })
      })
    }
    res.status(200).json({
      message: "Successfully deleted the Subject.",
    });
  } catch (error) {
    console.log("Server error.", error);
    return res.status(500).json({
      message: "Something went wrong while deleting Subject. Try again!",
    });
  }
};

module.exports = {
  create,
  get,
  join,
  update,
  deleteSubject,
};
