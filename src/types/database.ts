export interface Product {
  id?: number;
  code: string;
  name: string;
  categoryId: number;
  description?: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  notes?: string;
  createdAt: Date;
}

export interface Sale {
  id?: number;
  clientName: string;
  clientPhone?: string;
  staffId: number;
  staffName: string;
  commission: number;
  discount: number;
  subtotal: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

// Keep other existing interfaces...