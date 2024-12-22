import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { Credit } from '../types/database';

export interface CreditInput {
  code: string;
  clientName: string;
  clientPhone: string;
  productName: string;
  price: number;
  dueDate: Date;
  notes?: string;
}

export function useCredits() {
  const credits = useLiveQuery(() => 
    db.credits
      .orderBy('dueDate')
      .toArray()
  );

  const addCredit = async (creditData: CreditInput) => {
    const existingCredit = await db.credits.where('code').equals(creditData.code).first();
    if (existingCredit) {
      throw new Error('Ya existe un crédito con este código');
    }

    return await db.credits.add({
      ...creditData,
      status: 'pending',
      createdAt: new Date()
    });
  };

  const updateCredit = async (id: number, creditData: Partial<CreditInput>) => {
    if (creditData.code) {
      const existingCredit = await db.credits
        .where('code')
        .equals(creditData.code)
        .and(item => item.id !== id)
        .first();
        
      if (existingCredit) {
        throw new Error('Ya existe un crédito con este código');
      }
    }

    return await db.credits.update(id, creditData);
  };

  const deleteCredit = async (id: number) => {
    return await db.credits.delete(id);
  };

  const markAsPaid = async (id: number) => {
    return await db.credits.update(id, { status: 'paid' });
  };

  return {
    credits: credits || [],
    addCredit,
    updateCredit,
    deleteCredit,
    markAsPaid
  };
}