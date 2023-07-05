const express=require("express");
const { getAllcart, addTocart, editCart, cancelTocart } = require("../controllers/cartControler");
const cartRouter=express.Router();

cartRouter.get("/",getAllcart)
cartRouter.post("/",addTocart)
cartRouter.put("/",editCart);
cartRouter.delete("/",cancelTocart)

module.exports=cartRouter