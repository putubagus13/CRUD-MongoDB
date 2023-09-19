require("dotenv").config({
    path: ".env"
})
const express = require("express")
const app = express()
const monggoose = require("mongoose")
app.use(express.json());
// const bodyParser = require("body-parser")

// app.use(bodyParser.json({ type: 'application/*+json' }))

app.use("/users", require("./src/routers/index") )

monggoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = monggoose.connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
      console.log("Database is connected");
});

const {PORT} = process.env

app.listen(PORT, ()=>{
    console.log(`App runing at port:${PORT}`);
})