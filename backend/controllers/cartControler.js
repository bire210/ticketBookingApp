const busModel=require("../models/busModel");
const cartModel=require("../models/cartModel")

const getAllcart=async(req,res)=>{
try {
    const allTicket=await cartModel.find({userId:req.body.userId})
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



}

const editCart=async(req,res)=>{

}




module.exports={
    getAllcart,addTocart,cancelTocart,editCart
}