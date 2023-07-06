const express=require("express");
const { getAllcart, addTocart, cancelTocart } = require("../controllers/cartControler");
const cartRouter=express.Router();
const authenticate=require("../middlewares/authMiddleware")
cartRouter.post("/",authenticate,getAllcart)
cartRouter.post("/add",authenticate,addTocart)

cartRouter.delete("/:id",authenticate,cancelTocart)

module.exports=cartRouter