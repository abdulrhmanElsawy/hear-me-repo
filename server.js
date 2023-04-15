const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./controllers/users');



const app = express();
app.use(cors({
    origin : ["https://hearme.khuprat.com"],
    methods: ["POST","GET","DELETE"],
    credentials: true
}));

app.use("/uploads",express.static("./uploads"));
app.use('/', users);


const port = process.env.PORT || 5008;

console.log(process.env.PORT);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});