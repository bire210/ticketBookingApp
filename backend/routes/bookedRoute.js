const express=require("express");
const { getBookeDTicket, BookeDTicket, cancelBookeDTicket, getABookeDTicket } = require("../controllers/bookedControler");
const bookedRouter=express.Router();

bookedRouter.get("/",getBookeDTicket);
bookedRouter.get("/:id",getABookeDTicket);

bookedRouter.post("/:id",BookeDTicket);

bookedRouter.delete("/:id",cancelBookeDTicket);




module.exports=bookedRouter