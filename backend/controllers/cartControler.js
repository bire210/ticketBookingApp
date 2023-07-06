const busModel=require("../models/busModel");
const cartModel=require("../models/cartModel")
const authenticate=require("../middlewares/authMiddleware")

const getAllcart=async(req,res)=>{
try {
    const allTicket=await cartModel.find({userId:req.body.userId}).populate("busId")
    res.status(200).json(allTicket)
} catch (error) {
    res.status(500).json(error.message)
}
}


const addTocart=async(req,res)=>{
try {
    const newtickt=new cartModel(req.body)
    const addCart=await newtickt.save();
    res.status(200).json(addCart)
} catch (error) {
    res.status(500).json(error.message)
}


}


const cancelTocart=async(req,res)=>{
try {
    const deletd=await cartModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Delted your ticket from Cart")
} catch (error) {
    res.status(500).json("Not deleted")
}


}




module.exports={
    getAllcart,addTocart,cancelTocart
}