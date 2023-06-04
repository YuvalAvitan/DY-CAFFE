import asyncHandler from "express-async-handler";
import Item from "../models/Item.js";
import Category from "../models/Categories.js";

const timeBreakfast = async () => {
  const today = new Date();
  if (today.getHours() >= 6 && today.getHours() <= 14) {
    const items = await Item.find({ category: "Breakfast" });
    items.forEach(async (item) => {
      item.isAvailable = true;
      await item.save();
    });
  } else {
    const items = await Item.find({ category: "Breakfast" });
    items.forEach(async (item) => {
      item.isAvailable = false;
      await item.save();
    });
  }
};

setInterval(timeBreakfast, 10);
//@desc      Fetch all items
//@route      GET/api/items
//@access      Public
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  for (let i = 0; i < items.length; i++) {
    if (items[i].itemPrice.length < 1) {
      const item1 = await Item.findById(items[i].id);
      if (item1) {
        await item1.remove();
      }
    }
  }
  // const clean = items.filter((item) => item.itemPrice.length > 0);
  // clean.save();
  res.json(items);
});
//@desc      Fetch single item
//@route      GET/api/items/:id
//@access      Public
const getItemById = asyncHandler(async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;
  const item = await Item.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});
// @desc    Delete a item
// @route   DELETE /api/items/:id
// @access  Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: "Item removed" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Create a item
// @route   POST /api/items
// @access  Private/Admin
const createItem = asyncHandler(async (req, res) => {
  const item = new Item({
    itemName: "Sample name",
    itemPrice: [],
    itemPicture: "/images/sample.jpg",
    category: "Sample category",
    itemDescreption: "Sample description",
    itemSize: [],
    isAvailable: true,
    itemDiscount: 0,
    num_OF_sells: 0,
    ingredients: [""],
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Update a item
// @route   PUT /api/items/:id
// @access  Private/Admin
const updateItem = asyncHandler(async (req, res) => {
  const {
    name,
    prices,
    description,
    image,
    sizes,
    category,
    isAvailable,
    discount,
    ingredients,
  } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    item.itemName = name;
    item.itemPrice = prices;
    item.itemDescreption = description;
    item.itemPicture = image;
    item.isAvailable = isAvailable;
    item.category = category;
    item.ingredients = ingredients;
    item.category = category;
    item.itemDiscount = discount;
    item.itemSize = sizes;

    const updatedItem = await item.save();
    const categoryP = await Category.findOne({ name: category });
    if (!categoryP.items.includes(updatedItem._id)) {
      categoryP.items.push(updatedItem._id);
      categoryP.save();
    }
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc    Get top rated items
// @route   GET /api/items/top
// @access  Public
const getTopItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).sort({ num_OF_sells: -1 });
  const clean = items.filter((item) => item.itemPrice.length > 0);
  clean.save();

  res.json(clean);
});
export {
  getItemById,
  getItems,
  deleteItem,
  createItem,
  updateItem,
  getTopItems,
};
