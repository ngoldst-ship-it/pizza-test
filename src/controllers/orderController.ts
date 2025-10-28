import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orders } from '../models/data';
import { ICreateOrderRequest, IOrder, IUpdateOrderRequest } from '../types';

export const createOrder = (req: Request, res: Response) => {
  try {
    const orderData: ICreateOrderRequest = req.body;
    
    // Calculate prices
    const orderPrice = orderData.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const priorityPrice = orderData.priority ? orderPrice * 0.2 : 0;
    const totalPrice = orderPrice + priorityPrice;
    
    // Calculate estimated delivery (30-45 minutes)
    const deliveryMinutes = orderData.priority ? 30 : 45;
    const estimatedDelivery = new Date(Date.now() + deliveryMinutes * 60000).toISOString();
    
    // Create order
    const newOrder: IOrder = {
      id: uuidv4(),
      ...orderData,
      orderPrice,
      priorityPrice,
      totalPrice,
      estimatedDelivery,
      status: 'preparing',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    
    res.status(201).json({
      status: 'success',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create order'
    });
  }
};

export const getOrder = (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }
    
    res.json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get order'
    });
  }
};

export const updateOrder = (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updates: IUpdateOrderRequest = req.body;
    
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }
    
    // Update order with new values
    orders[orderIndex] = { ...orders[orderIndex], ...updates };
    
    res.json({
      status: 'success',
      data: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update order'
    });
  }
};
