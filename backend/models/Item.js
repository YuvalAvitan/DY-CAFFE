import mongoose from "mongoose";
const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      minlength: [2, "Item name must be longer than 2 letters"],
      maxlength: [255, "Item name must be shorter than 255 letters"],
    },
    itemDescreption: {
      type: String,
      required: [true, "Description is required"],
      minlength: [2, "The Description must be longer than 2 notes"],
      maxlength: [255, "The Description must be shorter than 255 notes"],
    },
    itemSize: {
      type: [String],
      required: [true, "Size is required"],
    },
    itemPrice: {
      type: [Number],
      required: [true, " Price is required"],
    },
    itemPicture: {
      type: String,
      required: [true, " Picture is required"],
    },
    isAvailable: {
      type: Boolean,
      required: [true, "Is Available is required"],
      default: false,
    },
    itemDiscount: {
      type: Number,
      min: [0, "Price cant be negative"],
      max: [100, "Price must be lower than 100"],
      default: 0,
    },
    num_OF_sells: {
      type: Number,
      min: [0, "Number of sells cant be negative"],
      default: 0,
    },
    ingredients: {
      type: [String],
      required: [true, "ingredients cant be None"],
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemSchema);

export default Item;
