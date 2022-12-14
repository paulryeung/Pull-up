const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  totalCost: {
    type: Number,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
