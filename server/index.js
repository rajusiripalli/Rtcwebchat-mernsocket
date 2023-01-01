require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const cors = require('cors')
const express = require('express');
const app = express();
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.send("server running"))

app.use('/api/user', authRouter);


app.listen(PORT, () =>{
    console.log(`Server Listening on port ${PORT} `)
})