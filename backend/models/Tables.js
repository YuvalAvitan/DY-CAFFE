import mongoose from "mongoose";
const TableSchema = mongoose.Schema(
  {
    TableNumber: {
      type: Number,
      required: [true, " TableNumber is required"],
      min: [1, "TableNumber cant be negative"],
      max: [999, "TableNumber must be lower than 100"],
      unique: true,
      sparse: true,
      default: 0,
    },
    Seats: {
      type: Number,
      required: [true, " Seats is required"],
      min: [2, "Seats cant be negative"],
      max: [4, "Seats must be lower than 5"],
      default: 2,
    },

    isAvailable: {
      type: Boolean,
      required: [true, "Is Available is required"],
      default: false,
    },
    Inside: {
      type: Boolean,
      required: [true, "Is Inside is required"],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Tables = mongoose.model("Tables", TableSchema);

export default Tables;
