const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const user_StudentModel = require('./models/user_Student')
const user_TeacherModel = require('./models/user_Teacher')
const teacher_AddCourseModel = require ('./models/teacher_Addcourse')
const student_AddCourseModel = require ('./models/student_Addcourse')
//jwt
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const cookieParser = require ('cookie-parser')
//jwt
var nodemailer = require('nodemailer');

require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true

}))
app.use(cookieParser())




//jwt
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json("The token was not available")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json("Token is wrong")
            next();
        })
    }
}

app.get('/studenthomepage',verifyUser, (req, res) => {
    return res.json("Success")
})

app.get('/teacherhomepage',verifyUser, (req, res) => {
    return res.json("Success")
})
//jwt


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
            bcrypt.compare(password, userStudent.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({email: userStudent.email}, "jwt-secret-key", {expiresIn:"1d"})
                    res.cookie("token",  token);
                    res.json("Success")
                }
                else  {
                    res.json("Password is incorrect")
                }//
            })
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
            bcrypt.compare(password, userTeacher.password, (err, response) => {
                if (response) {
                    const token = jwt.sign({email: userTeacher.email}, "jwt-secret-key", {expiresIn:"1d"})
                    res.cookie("token",  token);
                    res.json("Success")
                }
                else  {//optional getuyo ra para d ka proceed if i input ang hash password
                    res.json("Password is incorrect")
                }//
            })
        } else {
            res.json("No record existed")
        }
    })
})



app.post('/studentsignup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender } = req.body;

        // Check if the email already exists in the database
        const existingUser = await user_StudentModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // Hash the password
            bcrypt.hash(password, 10)
                .then(async (hash) => {
                    // Create a new user with the hashed password
                    const newUser = await user_StudentModel.create({
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        birthDate,
                        gender
                    });
                    
                    res.json(newUser);
                })
                .catch(err => console.log(err.message));
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/teachersignup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender, credentialsLink } = req.body;

        // Check if the email already exists in the database
        const existingUser = await user_TeacherModel.findOne({ email: email });

        if (existingUser) {
            res.json("Email already in use.");
        } else {
            // Hash the password
            bcrypt.hash(password, 10)
                .then(async (hash) => {
                    // Create a new user with the hashed password
                    const newUser = await user_TeacherModel.create({
                        firstName,
                        lastName,
                        email,
                        password: hash,
                        birthDate,
                        gender,
                        credentialsLink
                    });
                    
                    res.json(newUser);
                })
                .catch(err => console.log(err.message));
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
        const existingCourse_Title = await teacher_AddCourseModel.findOne({ course_title: course_title});

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

app.get('/getStudentAddcourses', (req, res) => {
    student_AddCourseModel.find()
    .then(courses => res.json(courses))
    .catch( err => res.json(err))
})

app.post('/student_AddCourse', async (req, res) => {
    const { enrolled_course } = req.body;try {
        // Check if the course already exists in the database
        const existingEnrolledCourse = await student_AddCourseModel.findOne({ enrolled_course});

        if (existingEnrolledCourse) {
            res.json("Course already exists");
        } else {
            // If the course does not exist, proceeds to create course
            const newEnrolledCourse = await student_AddCourseModel.create(req.body);
            res.json(newEnrolledCourse);
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

//nodemailer
app.post('/forgotpassword', (req, res) => {
    const { email } = req.body;

    // Check both student and teacher models
    Promise.all([
        user_StudentModel.findOne({ email }),
        user_TeacherModel.findOne({ email }),
    ])
    .then(([user_Student, user_Teacher]) => {
        // Check if either a student or a teacher with the given email exists
        if (user_Student || user_Teacher) {
            const user = user_Student || user_Teacher; // Use the first non-null user

            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'courcertdeveloper@gmail.com',
                    pass: 'lstu ntsg pqzb lwwt'
                }
            });

            var mailOptions = {
                from: 'youremail@gmail.com',
                to: email,
                subject: 'Reset Your Cour-Cert Account Password',
                text: `Dear Cour-Cert User,
                
                Here are your Cour-Cert Account Reset Password Link.
                The Reset Password link will expire in 24 hours.

                http://localhost:3000/resetpassword/${user._id}/${token}

                
                The Cour-Cert Developer Team`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.send({ Status: "Error sending email" });
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        } else {
            return res.send({ Status: "User doesn't exist." });
        }
    })
    .catch(error => {
        console.log(error);
        return res.send({ Status: "Error" });
    });
});


app.post('/resetpassword/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" });
        } else {
            bcrypt.hash(password, 10)
                .then(hash => {
                    // Check both student and teacher models
                    Promise.all([
                        user_StudentModel.findByIdAndUpdate({ _id: id }, { password: hash }),
                        user_TeacherModel.findByIdAndUpdate({ _id: id }, { password: hash }),
                    ])
                        .then(([studentUpdate, teacherUpdate]) => {
                            // Check if either a student or a teacher with the given ID exists
                            if (studentUpdate || teacherUpdate) {
                                return res.send({ Status: "Success" });
                            } else {
                                return res.send({ Status: "User doesn't exist." });
                            }
                        })
                        .catch(err => res.send({ Status: err }));
                })
                .catch(err => res.send({ Status: err }));
        }
    });
});
