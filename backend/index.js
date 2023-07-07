const express=require("express");
const colors=require("colors")
const cors = require('cors');
const app=express();
const port=process.env.PORT||8080
require("dotenv").config()
 const connecttion = require("./config/db");
 const { notFound, errorHandler }=require("./middlewares/errorMiddleware")
 const authRouter = require("./routes/authRoute");
 const busRouter = require("./routes/busRoute");
 const cartRouter = require("./routes/cartRoute");
 const bookedRouter = require("./routes/bookedRoute");

app.use(express.json())

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/auth",authRouter)
app.use("/bus",busRouter)
app.use("/cart",cartRouter)
app.use("/book",bookedRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(port,async()=>{
    try {
        await connecttion
        console.log(`Data base is connected `.cyan.underline)
    } catch (error) {
        console.log(`Database is not connected ${error}`.red.bold)
    }
    console.log(`server is running over ${port}`.yellow.bold)
})