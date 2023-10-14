const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')
const user_TeacherModel = require('./models/user_Teacher')
const teacher_AddCourseModel = require ('./models/teacher_Addcourse')
require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors())


//Goes into the database 
app.post("/loginsignupstudent", (req, res) => {
    const {email, password} = req.body;
    
    // if( email == user_StudentModel.findOne({email:email})){
    // user_StudentModel.findOne({email: email})
    // .then(userStudent => {
    //     if(userStudent) {
    //         if(userStudent.password === password) {
    //             res.json("Success")
    //         } else {
    //             res.json("Password is incorrect")
    //         }
    //     } else {
    //         res.json("No record existed")
    //     }
    // })}
    // Add code for else statement that go find email in teacher database

    user_StudentModel.findOne({email: email})
    .then(userStudent => {
        if(userStudent) {
            if(userStudent.password === password) {
                res.json("Success")
            } else {
                res.json("Password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post("/loginsignupteacher", (req, res) => {
    const {email, password} = req.body;
    
    user_TeacherModel.findOne({email: email})
    .then(userTeacher => {
        if(userTeacher) {
            if(userTeacher.password === password) {
                res.json("Success")
            } else {
                res.json("Password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })

    
})



app.post('/studentsignup', async (req, res) => {
    const { email } = req.body;try {
        // Check if the email already exists in the database
        const existingUser = await user_StudentModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // If the email is not in use, proceed with user registration
            const newUser = await user_StudentModel.create(req.body);
            res.json(newUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
});

app.post('/teachersignup', async (req, res) => {
    const { email } = req.body;try {
        // Check if the email already exists in the database
        const existingUser = await user_TeacherModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // If the email is not in use, proceed with user registration
            const newUser = await user_TeacherModel.create(req.body);
            res.json(newUser);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
});

// app.get('/getteacher_Addcourse', async (req,res) => {
//     const courses = teacher_AddCourseModel;

//     const teacherCourse =  await courses.find({}).populate('').exec((err, courseData)) => {
//         if (err) throw err;
//         if (courseData){
//             res.end(JSON.stringify(courseData));
//         } else {
//             res.end();
//         }
//     };
// })

app.get('/getTeachercourses', (req, res) => {
    teacher_AddCourseModel.find()
    .then(courses => res.json(courses))
    .catch( err => res.json(err))
})

app.post('/teacher_AddCourse', async (req, res) => {
    const { course_title } = req.body;try {
        // Check if the course already exists in the database
        const existingCourse_Title = await teacher_AddCourseModel.findOne({ course_title: course_title });

        if (existingCourse_Title) {
            res.json("Course already exists");
        } else {
            // If the course does not exist, proceeds to create course
            const newCourse = await teacher_AddCourseModel.create(req.body);
            res.json(newCourse);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });   
    }
})


mongoose.connect(process.env.DB_URI, {useNewURLParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('DB Connected!');
})
.catch ( (err) => {
    console.log(err);
})

app.listen(3002, () => {
    console.log("server is running")
})