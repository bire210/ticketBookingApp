const express=require("express");
const { getAllcart, addTocart, editCart, cancelTocart } = require("../controllers/cartControler");
const cartRouter=express.Router();
const authenticate=require("../middlewares/authMiddleware")
cartRouter.get("/",authenticate,getAllcart)
cartRouter.post("/",authenticate,addTocart)

cartRouter.delete("/",authenticate,cancelTocart)

module.exports=cartRouter