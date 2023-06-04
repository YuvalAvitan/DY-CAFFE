import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    Tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tables",
      },
    ],
    Inside: {
      type: Boolean,
      required: [true, "Inside is required"],
      default: true,
    },
    isAvailable: {
      type: Boolean,
      required: [true, "Is Available is required"],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Rooms = mongoose.model("Rooms", roomSchema);

export default Rooms;
