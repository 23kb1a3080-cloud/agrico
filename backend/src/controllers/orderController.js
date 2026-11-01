import { memoryDb } from '../utils/memoryDb.js';
import { ORDER_STATUS } from '../config/constants.js';

export const createOrder = (req, res, next) => {
  try {
    const { items, shippingAddress, contactPhone, deliveryNotes } = req.body;
    const user = req.user;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order items are required.' });
    }

    const firstProduct = memoryDb.products.find(p => p.id === items[0].productId);
    const farmerId = firstProduct ? firstProduct.farmerId : 1;
    const farmer = memoryDb.users.find(u => u.id === farmerId) || { fullName: 'Ramesh Patel' };

    let calculatedTotal = 0;
    const orderItems = items.map(item => {
      const prod = memoryDb.products.find(p => p.id === item.productId);
      const unitPrice = prod ? prod.price : item.price;
      const subtotal = unitPrice * item.quantity;
      calculatedTotal += subtotal;

      // Atomically decrement stock
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }

      return {
        productId: item.productId,
        title: prod ? prod.title : item.title,
        price: unitPrice,
        quantity: item.quantity,
        unit: prod ? prod.unit : (item.unit || 'KG'),
        subtotal
      };
    });

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: user.id,
      customerName: user.fullName || user.name,
      customerPhone: contactPhone || user.phone || '+91 99887 76655',
      farmerId,
      farmerName: farmer.fullName || 'Ramesh Patel',
      totalAmount: calculatedTotal + 50, // subtotal + 50 mandi logistics
      items: orderItems,
      status: ORDER_STATUS.PLACED,
      shippingAddress: shippingAddress || user.address || 'Address provided on checkout',
      deliveryNotes: deliveryNotes || '',
      placedAt: new Date().toLocaleString(),
      trackingTimeline: [
        { stage: ORDER_STATUS.PLACED, time: new Date().toLocaleString(), note: 'Order placed by customer.' }
      ]
    };

    memoryDb.orders.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Produce order placed successfully with farmer.',
      order: newOrder
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerOrders = (req, res) => {
  const customerOrders = memoryDb.orders.filter(o => o.customerId === req.user.id);
  res.json({
    success: true,
    orders: customerOrders
  });
};

export const getFarmerOrders = (req, res) => {
  const farmerOrders = memoryDb.orders.filter(o => o.farmerId === req.user.id);
  res.json({
    success: true,
    orders: farmerOrders
  });
};

export const updateOrderStatus = (req, res) => {
  const { status, note } = req.body;
  const order = memoryDb.orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order reference not found.' });
  }

  if (order.farmerId !== req.user.id && req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Unauthorized to update order status.' });
  }

  order.status = status;
  order.trackingTimeline.push({
    stage: status,
    time: new Date().toLocaleString(),
    note: note || `Order updated to ${status}`
  });

  res.json({
    success: true,
    message: `Order status advanced to ${status}.`,
    order
  });
};
