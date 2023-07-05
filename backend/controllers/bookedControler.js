const cartModel=require("../models/cartModel");
const busModel=require("../models/busModel");
const bookedModel=require("../models/bookedModel");
const { upDateBus } = require("../utils/util");


const getBookeDTicket=async(req,res)=>{

    try {
        const allticket=await bookedModel.find({userId:req.body.userId})
        res.status(200).json(allticket)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const getABookeDTicket=async(req,res)=>{
    try {
        const ticket=await bookedModel.findById(req.params.id)
        res.status(200).json(ticket)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const BookeDTicket=async(req,res)=>{
    console.log(req.params.id)
    try {
        const bookedTicket=await cartModel.findById(req.params.id)
        let updateSeat=bookedTicket.seatNo;
        const delelteFromCart=await cartModel.findByIdAndDelete(req.params.id)
        const busSeatRem=upDateBus(bookedTicket.seatNo)
        // const uddatebus=await busModel.updateOne({$set:{[`seat.${updateSeat}`]:true}})

        const filter = { _id: bookedTicket.busId }; // Replace with the actual document _id

        // Construct the update object to toggle the seat value to true dynamically
        const update = { $set: { seat: busSeatRem } };
    
        const result = await busModel.updateOne(filter, update);
        console.log(result)
        const newTicket=new bookedModel({
            userId:bookedTicket.userId,
            busId:bookedTicket.busId,
            seatNo:bookedTicket.seatNo
        })

        const saved=await newTicket.save();
        res.status(200).json({data:saved,mes:"Ticket is Booked"})
    } catch (error) {
        res.status(500).json(error.message)
    }

}

const cancelBookeDTicket=async(req,res)=>{
    try {
        const ticket=await bookedModel.findByIdAndDelete(req.params.id)
        console.log(ticket)
        let updateSeat=ticket.seatNo;
        const bus=await busModel.updateOne({_id:ticket.busId},{$set:{[`seat.${updateSeat}`]:false}})
        res.status(200).json(" Ticke has been canceld")
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports={
    getBookeDTicket,getABookeDTicket,BookeDTicket,cancelBookeDTicket
}