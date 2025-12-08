import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

/**
 * @desc  Place a new order
 * @route POST /api/orders
 * @access Private (User)
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, address, phone, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;

    // Calculate total & verify stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }
      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity; // reduce stock
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      address,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get logged-in user's orders
 * @route GET /api/orders/my
 * @access Private (User)
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get all orders (Admin)
 * @route GET /api/orders
 * @access Private/Admin
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update order status (Admin)
 * @route PUT /api/orders/:id/status
 * @access Private/Admin
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;
    await order.save();

    res.json({
      success: true,
      message: `Order marked as '${order.status}'`,
      order,
    });
  } catch (error) {
    next(error);
  }
};
