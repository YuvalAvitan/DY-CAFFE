import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
    ],
    name: {
      type: String,
      required: [true, "name is required"],
    },
  },
  {
    timestamps: true,
  }
);
const Categories = mongoose.model("Categories", CategorySchema);

export default Categories;
