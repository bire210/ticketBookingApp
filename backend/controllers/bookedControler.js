const cartModel=require("../models/cartModel");
const busModel=require("../models/busModel");
const bookedModel=require("../models/bookedModel");



const getBookeDTicket=async(req,res)=>{

    try {
        const allticket=await bookedModel.find({userId:req.body.userId}).populate("busId")
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
    // console.log(req.params.id)
    try {
        const bookedTicket=await cartModel.findById(req.params.id)
        let updateSeat=bookedTicket.seatNo;
        // console.log(bookedTicket)
        const delelteFromCart=await cartModel.findByIdAndDelete(req.params.id)
        const filter = { _id: bookedTicket.busId }; // Replace with the actual document _id

        // Construct the update object to toggle the seat value to true dynamically
        const update = { $set: { [`seats.${updateSeat}`]: true } };
    
        const result = await busModel.updateOne(filter, update);
        // console.log(result)
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
   

    // console.log(req.params.id)
    try {
        const bookedTicket=await bookedModel.findById({_id:req.params.id})
        let updateSeat=bookedTicket.seatNo;
        // console.log(bookedTicket)
        const delelteFromCart=await bookedModel.findByIdAndDelete(bookedTicket._id)
        // console.log(delelteFromCart)
        const filter = { _id: bookedTicket.busId }; // Replace with the actual document _id

        // Construct the update object to toggle the seat value to true dynamically
        const update = { $set: { [`seats.${updateSeat}`]:false} };
    
        const result = await busModel.updateOne(filter, update);
        // console.log(result)
        res.status(200).json(" Ticket has been canceld")
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports={
    getBookeDTicket,getABookeDTicket,BookeDTicket,cancelBookeDTicket
}