import { Request, Response } from 'express';
import { pizzas } from '../models/data';

export const getMenu = (req: Request, res: Response) => {
  try {
    res.json({
      status: 'success',
      data: pizzas
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get menu internal error'
    });
  }
};
