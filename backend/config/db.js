const mongoose=require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery',false);
const connecttion=mongoose.connect(process.env.mongourl);
module.exports=connecttion