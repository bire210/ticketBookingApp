const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    busId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "bus",
    },
    seatNo: {
      type:Number
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("booked", bookSchema);
module.exports=bookModel;