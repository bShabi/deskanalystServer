const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successfully")
})


const userRouter = require('./routes/users')
const teamRouter = require('./routes/teams')
const playerRouter = require('./routes/players')
const gameRouter = require('./routes/games')


app.use('/users', userRouter);
app.use('/teams', teamRouter);
app.use('/players', playerRouter);
app.use('/games', gameRouter);


app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})