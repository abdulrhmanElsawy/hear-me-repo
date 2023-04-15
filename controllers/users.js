const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const axios = require( "axios");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const nodemailer = require('nodemailer');




const app = express();
axios.defaults.withCredentials = true;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));




app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin : ["https://hearme.khuprat.com"],
    methods: ["POST", "GET","DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    user: "khuptvyw_hearme",
    host: "68.65.122.110", // replace with the hostname or IP address of the server
    password: "hearme222***",
    database: "khuptvyw_hearme",
    port: 3306 // the port number of your MySQL server, default is 3306
});

// const con = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "",
//     database: "hearme"
// });


con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + con.threadId);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const userId = req.session.userId;
        const fileExt = file.originalname.split('.').pop();
        const fileName = userId + '.' + fileExt;
        cb(null, fileName);
    }
});

const upload = multer({
    dest: "./uploads/",

    storage: storage,
    
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb('Error: Images Only!');
        }
    }
});


function cropImage(imagePath, cb) {
    const outputPath = imagePath.replace(/(\.[\w\d_-]+)$/i, '-thumbnail$1');
    sharp(imagePath)
    .resize({
        height: 150,
        width: 150,
        fit: 'cover'
    })
    .toFile(outputPath, function (err, info) {
        if (err) {
        return cb(err);
        }
        return cb(null, outputPath);
    });
}


app.post("/upload-image", upload.single("image"), (req, res) => {
    const userId = req.session.userId;
    const file = req.file;

    if (file) {
    const imagePath = './uploads/' + userId + '.' + file.originalname.split('.').pop();

    cropImage(imagePath, function (err, imagePathThumbnail) {
        if (err) {
        console.log(err);
        return res.send({ message: 'Error uploading image' });
        } else {
        con.query("UPDATE users SET img = ? WHERE id = ?", [imagePathThumbnail.replace(/^.*[\\\/]/, ''), userId], (err, result) => {
            if (err) {
            console.error(err);
            return res.send({ message: 'Error updating database' });
            } else {
            return res.send({ message: 'Profile image updated successfully' });
            }
        });
        }
    });
    } else {
    return res.send({ message: 'User not authenticated' });
    }
});



app.get('/session', (req, res) => {
    if(req.session.email) {
        return res.json({valid: true, email: req.session.email,userId : req.session.userId})
    } else {
        return res.json({valid: false})
    }
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const name = req.body.name;

    con.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error(err);
            res.send({ message: 'Error registering user' });
        } else {
            if (result.length > 0) {
                res.send({ message: 'Email already exists' });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.error(err);
                        res.send({ message: 'Error registering user' });
                    } else {
                        con.query("INSERT INTO users(email,password,phonenumber,name) VALUES(?,?,?,?)", [email, hash, phonenumber, name],
                            (err, result) => {
                                if (result) {
                                    res.send({message : "Please kindly wait until one of our administrators activates your account."});
                                } else {
                                    res.send({ err, message: "Enter Correct asked details" });
                                }
                            }
                        )
                    }
                });
            }
        }
    });
});


app.post('/user', (req, res) => {
    const userId = req.body.userId;

    con.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
        console.error(err);
        res.send({ message: 'Error getting user' });

    } else {
        if (result.length > 0) {
        res.send(result[0]);
        } else {
        res.send({ message: 'User not found' });

        }
    }
    });
});



app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    con.query("SELECT * FROM users WHERE email =?", [email],
        (err,result) => {
            if(err) {
                res.send({err: err})
            } else {
                if(result.length > 0) {
                    if (result[0].status === 'in-active') {
                        res.send({message: "Your account is inactive. Please wait until one of our administrators activates your account."});
                    } else {
                        bcrypt.compare(password, result[0].password, (err, isMatch) => {
                            if (isMatch) {
                                req.session.email = result[0].email;
                                req.session.userId = result[0].id;

                                res.json(result);
                            } else {
                                res.send({message : "Wrong username or password"});
                            }
                        });
                    }
                } else {
                    res.send({message : "Wrong username or password"});
                }
            }
        }
    )
});


app.get('/logout', (req, res) => {
    if (req.session.email) {
        res.header('Cache-control', 'no-cashe');
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            } else {
                return res.send({logout: true});
            }
        });
    }
});



function getResultHistory(req, res) {
    const userId = req.session.userId;
    con.query("SELECT * FROM `result-history` WHERE userid = ?", [userId], (err, result) => {
    if (err) {
    console.error(err);
    res.send({ message: 'Error getting result history' });
    } else {
    res.send({ data: result });
    }
    });
    }
    
    app.get('/result-history', (req, res) => {
    if (req.session.userId) {
    getResultHistory(req, res);
    } else {
    res.send({ message: 'User not authenticated' });
    }
    });
    
    
    
    

    app.delete('/result-history/:id', (req, res) => {
        const resultId = req.params.id;
        const userId = req.session.userId;
        


        con.query('SELECT * FROM `result-history` WHERE id = ?', [resultId], (err, result) => {
        if (err) {
            return res.send({ message: 'Error deleting result history' });
        } else if (result.length === 0) {
            return res.send({ message: 'Result history not found' });
        } else if (result[0].userid != userId) {

            return res.send({ message: 'Unauthorized access to result history' });
        } else {
            con.query('DELETE FROM `result-history` WHERE id = ?', [resultId], (err, result) => {
            if (err) {
                return res.send({ message: 'Error deleting result history' });
            } else {
                return res.send({ message: 'Result history deleted successfully' });
            }
            });
        }
        });
    });
    
    

    app.get('/questions', (req, res) => {
        con.query("SELECT * FROM test_questions", (err, result) => {
        if (err) {
            console.error(err);
            res.send({ message: 'Error retrieving questions' });
        } else {

            res.send(result);
        }
        });
    });
    



    app.post('/add-result', (req, res) => {
        const userId = req.session.userId;
        const name = "Eary Test";
        const score = req.body.score;
        con.query("INSERT INTO  `result-history` (userId,name,score) VALUES(?,?,?)", [userId, name, score],
            (err, result) => {
                if (result) {
                    return res.send({result : "Added successfully"});
                } else {
                    return res.send({ result: "Please Login to save your results" });
                }
            }
        )
    });
    

    app.post('/send-email', (req, res) => {
        const { recipientEmail, subject, body } = req.body;
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "abdoelsawyx88@gmail.com", // your email address
            pass: "hbxxvmfprzlvhvxk", // your email password
        },
        });
    
        // send mail with defined transport object
        let mailOptions = {
        from: `Hearme website Customer ${recipientEmail}`, // sender address
        to: "abdoelsawyx1@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'Email failed to send.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ message: 'Email sent successfully.' });
        }
        });
    });
    

module.exports = app;
