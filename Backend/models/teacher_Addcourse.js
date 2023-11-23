const mongoose = require('mongoose')

const teacher_Addcourse = new mongoose.Schema({
  //user: {type:Schema.Types.ObjectId, ref: 'user_teachers'},
  course_title: String,
  course_description: String,
  week_numbers: Array,
  uploaded_files: Array,
})


const teacher_AddCourseModel = mongoose.model ("teacher_Addcourse", teacher_Addcourse, 'teacher_AddCourse' )

module.exports = teacher_AddCourseModel