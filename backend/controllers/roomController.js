import asyncHandler from "express-async-handler";
import Rooms from "../models/Rooms.js";

//@desc      Fetch all Rooms
//@route      GET/api/rooms
//@access      Public
const getRooms = asyncHandler(async (req, res) => {
  const rooms = await Rooms.find({}).populate("Tables");
  res.json(rooms);
});
export { getRooms };
