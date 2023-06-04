import asyncHandler from "express-async-handler";
import Table from "../models/Tables.js";
import mongoose from "mongoose";

//@desc      Fetch ALL tables
//@route      GET/api/tables
//@access      Public
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({});
  res.json(tables);
});
//@desc      Fetch  tables by id
//@route      GET/api/tables/:id
//@access      Private
const getTableByID = asyncHandler(async (req, res) => {
  const tables = await Table.findById(req.params.id);
  res.json(tables);
});
//@desc      Fetch inside tables
//@route      GET/api/tables
//@access      Public
const getTablesInside = asyncHandler(async (req, res) => {
  const tables = await Table.find({ Inside: true });
  res.json(tables);
});

//@desc      Fetch outside tables
//@route      GET/api/tables
//@access     Public
const getTablesOutside = asyncHandler(async (req, res) => {
  const tables = await Table.find({ Inside: false });
  res.json(tables);
});

//@desc      Update unavailable table
//@route      PUT/api/tables
//@access     Public
const updateUnavailable = asyncHandler(async (req, res) => {
  const { tables } = req.body;
  tables.map(async (t) => {
    const table = await Table.findOne({ TableNumber: Number(t) });
    table.isAvailable = false;
    await table.save();
  });

  res.send({ status: "OK" });
});
// @desc    Delete a table
// @route   DELETE /api/tables/:id
// @access  Private/Admin
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (table) {
    await table.remove();
    res.json({ message: "table removed" });
  } else {
    res.status(404);
    throw new Error("table not found");
  }
});
//@desc      add table
//@route      POST/api/tables
//@access      Private/Admin
const addTable = asyncHandler(async (req, res) => {
  const { TableNumber, Seats, isAvailable, Inside } = req.body;
  const table = new Table({
    TableNumber,
    Seats,
    isAvailable,
    Inside,
  });
  const createdTable = await table.save();
  res.status(201).json(createdTable);
});
// @desc    Update table
// @route   PUT /api/tables/:id
// @access  Private/Admin
const updateTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (table) {
    table.TableNumber = req.body.TableNumber || table.TableNumber;
    table.Seats = req.body.Seats || table.Seats;
    table.isAvailable = req.body.isAvailable;
    table.Inside = req.body.Inside;
    const updatedTable = await table.save();

    res.json({
      _id: updatedTable._id,
      TableNumber: updatedTable.TableNumber,
      Seats: updatedTable.Seats,
      isAvailable: updatedTable.isAvailable,
      Inside: updatedTable.Inside,
    });
  } else {
    res.status(404);
    throw new Error("Table not found");
  }
});
export {
  getTablesInside,
  getTablesOutside,
  updateUnavailable,
  getTables,
  getTableByID,
  addTable,
  updateTable,
  deleteTable,
};
