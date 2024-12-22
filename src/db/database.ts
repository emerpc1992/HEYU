import Dexie, { Table } from 'dexie';
import { User, Product, Category, Client, Staff, Appointment, Credit, PettyCash, Expense, Sale, SaleItem } from '../types/database';

export class SalonDatabase extends Dexie {
  users!: Table<User>;
  categories!: Table<Category>;
  products!: Table<Product>;
  clients!: Table<Client>;
  staff!: Table<Staff>;
  appointments!: Table<Appointment>;
  credits!: Table<Credit>;
  pettyCash!: Table<PettyCash>;
  expenses!: Table<Expense>;
  sales!: Table<Sale>;
  saleItems!: Table<SaleItem>;

  constructor() {
    super('salonDB');
    
    this.version(8).stores({
      users: '++id, username, password',
      categories: '++id, name',
      products: '++id, code, name, categoryId, stock, minStock, costPrice, salePrice',
      clients: '++id, code, name, phone',
      staff: '++id, code, name, phone',
      appointments: '++id, clientName, appointmentDate',
      credits: '++id, code, clientName, status, dueDate',
      pettyCash: '++id, type, amount, createdAt',
      expenses: '++id, date, category',
      sales: '++id, clientName, staffId, total, status, createdAt',
      saleItems: '++id, saleId, productId, productName, quantity, price, subtotal'
    });
  }
}