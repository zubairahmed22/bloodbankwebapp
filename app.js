const mongoose = require('mongoose');
const express  = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const authRoutes =  require("./routes/auth")




mongoose.connect(process.env.DATABASE,
{useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>{
    console.log("DB CONNTECTED")
})

app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());
app.use(cors());




//My Routes
app.use("/api",authRoutes)

const port = process.env.PORT || 8000;


if(process.env.NODE_ENV === "production"){
    app.use(express.static("init/build")) ;
    const path = require('path')
    app.get("*",(req,res) =>{
        res.sendFile(path.resolve(__dirname,"init","build","index.html"))
    })
 }

app.listen(port,() =>{
    console.log(`Server is running at ${port}`)
})