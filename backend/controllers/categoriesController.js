import asyncHandler from "express-async-handler";
import Category from "../models/Categories.js";
//@desc      Fetch all categories
//@route      GET/api/categories
//@access      Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("items");
  res.json(categories);
});
//@desc      add category
//@route      POST/api/categories
//@access      Private/Admin
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = new Category({
    name,
    items: [],
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});
// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "category removed" });
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});
export { getCategories, addCategory, deleteCategory };
