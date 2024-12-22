import Dexie from 'dexie';
import { db } from '../db';

export async function resetDatabase() {
  try {
    // Only initialize database if it doesn't exist
    const dbExists = await Dexie.exists('salonDB');
    if (!dbExists) {
      await db.open();
      
      // Add default user
      await db.users.add({
        username: 'admin',
        password: 'admin',
        role: 'admin',
        createdAt: new Date()
      });

      // Add default categories
      await db.categories.bulkAdd([
        { name: 'Maquillaje', createdAt: new Date() },
        { name: 'Cuidado del Cabello', createdAt: new Date() },
        { name: 'Cuidado de la Piel', createdAt: new Date() }
      ]);

      // Add default staff member
      await db.staff.add({
        code: 'STAFF001',
        name: 'Administrador',
        phone: '123456789',
        createdAt: new Date()
      });

      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // Re-throw to handle in calling code
  }
}