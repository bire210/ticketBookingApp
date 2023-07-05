const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seats: {
      type: Object
    },
  },
  { timestaps: true }
);
const busModel = mongoose.model("bus", busSchema);
module.exports = busModel;
