const express = require("express");
const app = express();
const cors = require ("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const User = require('./models/user.js')

const bcryptSalt = bcrypt.genSaltSync(10);

require('dotenv').config()


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) =>{
    const {firstName, lastName, email, password} = req.body;

try {
    const userDoc = await User.create({
        firstName,
        lastName,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc); 
} catch(e) {
    res.status(422).json(e)
}
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if (userDoc) {
        res.json('found')
    } else {
        res.json('not found')
    }
})



app.listen(4000)