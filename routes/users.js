const express = require('express');
const router = express.Router();
const cors = require('cors');


const { getSession, register, login } = require('../controllers/users');
router.use(cors({
    origin : ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}));

router.get('/session', (req, res) => {
getSession(req, res);
});

router.post('/register', (req, res) => {
register(req, res);
});

router.post('/login', (req, res) => {
login(req, res);
});

module.exports = router;
