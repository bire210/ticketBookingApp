const express=require("express");
const { getBookeDTicket, BookeDTicket, cancelBookeDTicket, getABookeDTicket } = require("../controllers/bookedControler");
const bookedRouter=express.Router();
const authenticate=require("../middlewares/authMiddleware")


bookedRouter.post("/",authenticate,getBookeDTicket);

bookedRouter.get("/:id",authenticate,getABookeDTicket);

bookedRouter.post("/:id",authenticate,BookeDTicket);

bookedRouter.delete("/:id",authenticate,cancelBookeDTicket);
module.exports=bookedRouter