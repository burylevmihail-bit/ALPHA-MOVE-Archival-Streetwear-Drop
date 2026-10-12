export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Category = 'all' | 'hoodies' | 'denim' | 'cargos';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'hoodies' | 'denim' | 'cargos';
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  fabricSpecs: {
    density: string;
    composition: string;
    washType: string;
    hardware: string;
    fitType: string;
  };
  details: string[];
  images: string[];
  availableSizes: {
    size: Size;
    stock: number;
  }[];
  measurements: Record<Size, {
    length?: number; // длина
    chest?: number; // полуобхват груди
    sleeve?: number; // рукав от горла
    waist?: number; // талия
    outseam?: number; // длина по внешнему шву
    legOpening?: number; // ширина штанины внизу
  }>;
  colorName: string;
  colorHex: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}

export interface DeliveryOption {
  id: string;
  name: string;
  cost: number;
  time: string;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryMethod: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCost: number;
  total: number;
  trackingNumber: string;
}
