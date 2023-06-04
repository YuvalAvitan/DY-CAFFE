import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "User name is required"],
      minlength: [2, "User name must be longer than 2 letters"],
      maxlength: [255, "User name must be shorter than 255 letters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "The email address is already exists"],
      minlength: [2, "The email address must be longer than 2 notes"],
      maxlength: [255, "The email address must be shorter than 255 notes"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be longer than 8 notes"],
      maxlength: [255, "Password must be shorter than 255 notes"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBarista: {
      type: Boolean,
      default: false,
    },

    isClient: {
      type: Boolean,
      default: true,
    },

    isVipClient: {
      type: Boolean,
      default: false,
    },
    numberOfCups: {
      type: Number,
      min: [0, "Number Of Cups cant be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("Users", userSchema);

export default User;
