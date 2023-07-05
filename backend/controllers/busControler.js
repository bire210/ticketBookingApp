const busModel=require("../models/busModel");
const { createBus } = require("../utils/util");

const createBusControler=async(req,res)=>{
 const ob=createBus()
    try {
        const newBus=new busModel({
            name:req.body.name,
            from:req.body.from.toLowerCase(),
            to:req.body.to.toLowerCase(),
            price:req.body.price,
            seats:ob
        })
        const saved=await newBus.save();
        res.status(200).json(saved)
    } catch (error) {
       res.status(500).json(error.message) 
    }
}
const searchBusControler=async(req,res)=>{
    
    const {from,to}=req.body;
    try {
        const bustList=await busModel.find({from:from.toLowerCase(),to:to.toLowerCase()})
        res.status(200).json(bustList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const searchABusControler=async(req,res)=>{
    
    try {
        const bus=await busModel.findById({_id:req.params.id})
        res.status(200).json(bus)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports={createBusControler,searchBusControler,searchABusControler}