const express=require("express");
const { createBusControler, searchBusControler, searchABusControler } = require("../controllers/busControler");

const busRouter=express.Router();

busRouter.post("/create",createBusControler)
busRouter.get("/search",searchBusControler)
busRouter.get("/search/:id",searchABusControler)


module.exports=busRouter