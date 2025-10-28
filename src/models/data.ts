import { IPizza, IOrder } from '../types';

// Mock pizza data
export const pizzas: IPizza[] = [
  {
    id: 1,
    name: "Margherita",
    unitPrice: 12,
    soldOut: false,
    ingredients: ["tomato", "mozzarella", "basil"],
    imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800"
  },
  {
    id: 2,
    name: "Pepperoni",
    unitPrice: 15,
    soldOut: false,
    ingredients: ["tomato", "mozzarella", "pepperoni"],
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800"
  },
  {
    id: 3,
    name: "Hawaiian",
    unitPrice: 14,
    soldOut: false,
    ingredients: ["tomato", "mozzarella", "ham", "pineapple"],
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
  },
  {
    id: 4,
    name: "Vegetarian",
    unitPrice: 13,
    soldOut: false,
    ingredients: ["tomato", "mozzarella", "mushrooms", "bell peppers", "olives"],
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"
  },
  {
    id: 5,
    name: "BBQ Chicken",
    unitPrice: 16,
    soldOut: false,
    ingredients: ["bbq sauce", "mozzarella", "chicken", "red onions"],
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800"
  },
  {
    id: 6,
    name: "Supreme",
    unitPrice: 18,
    soldOut: false,
    ingredients: ["tomato", "mozzarella", "pepperoni", "sausage", "mushrooms", "bell peppers", "olives"],
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800"
  }
];

// In-memory storage for orders (in a real app, this would be a database)
export let orders: IOrder[] = [];
