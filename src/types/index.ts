export interface IPizza {
  id: number;
  name: string;
  unitPrice: number;
  soldOut: boolean;
  ingredients: string[];
  imageUrl: string;
}

export interface ICartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  cart: ICartItem[];
  priority: boolean;
  position: IPosition;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
  totalPrice: number;
  status: 'preparing' | 'ready' | 'delivered';
  createdAt: string;
}

export interface ICreateOrderRequest {
  customer: string;
  phone: string;
  address: string;
  cart: ICartItem[];
  priority: boolean;
  position: IPosition;
}

export interface IUpdateOrderRequest {
  priority?: boolean;
  status?: 'preparing' | 'ready' | 'delivered';
}
