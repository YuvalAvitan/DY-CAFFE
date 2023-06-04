import asyncHandler from "express-async-handler";
import Order from "../models/Orders.js";
import Item from "../models/Item.js";
import Users from "../models/Users.js";
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    tableNumber,
    paymentMethod,
    itemsPrice,
    totalPrice,
    orderName,
    email,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    var temp1 = 0;

    orderItems.map(async (i) => {
      let temp = await Item.findById(i.product);
      temp.num_OF_sells = temp.num_OF_sells + Number(i.qty);
      temp1 = temp1 + Number(i.qty);
      await temp.save();
    });
    var user1 = await Users.findOne({ email: email });
    if (!user1) {
      user1 = await Users.findById(req.user._id);
    }

    let createdOrder;
    if (user1 && user1.isVipClient) {
      const order = new Order({
        orderItems,
        user: user1._id,
        orderName,
        tableNumber,
        paymentMethod,
        itemsPrice: itemsPrice * 0.95,
        totalPrice: totalPrice * 0.95,
        createdAt: new Date().setHours(new Date().getHours() + 2),
      });
      user1.numberOfCups = user1.numberOfCups + temp1;
      await user1.save();
      createdOrder = await order.save();
    } else if (user1) {
      const order = new Order({
        orderItems,
        user: user1._id,
        orderName,
        tableNumber,
        paymentMethod,
        itemsPrice,
        totalPrice,
        createdAt: new Date().setHours(new Date().getHours() + 2),
      });
      user1.numberOfCups = user1.numberOfCups + temp1;
      await user1.save();
      createdOrder = await order.save();
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        orderName,
        tableNumber,
        paymentMethod,
        itemsPrice,
        totalPrice,
        createdAt: new Date().setHours(new Date().getHours() + 2),
      });
      req.user.numberOfCups = req.user.numberOfCups + temp1;
      await req.user.save();
      createdOrder = await order.save();
    }

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "fullname email isVipClient"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const newDate = new Date();
  newDate.setHours(newDate.getHours() + 2);
  if (order) {
    order.isPaid = true;
    order.paidAt = newDate;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Update order to paid cash
// @route   GET /api/orders/:id/paid
// @access  Private/Admin/barista
const updateOrderToPaid1 = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});
// @desc    delete  order by id
// @route   Delete /api/orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.remove();
    res.json({ message: "order removed" });
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToPaid1,
  deleteOrder,
};
