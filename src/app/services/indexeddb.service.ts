import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define database schema
interface InvestmentDB extends DBSchema {
  investments: {
    key: number;
    value: {
      id?: number; // Optional because it's auto-generated
      assetType: string;
      quantity: number;
      purchasePrice: number;
      date: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<InvestmentDB>>;

  constructor() {
    this.dbPromise = openDB<InvestmentDB>('InvestmentDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('investments')) {
          db.createObjectStore('investments', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  // Add a new investment
  async addInvestment(investment: Omit<InvestmentDB['investments']['value'], 'id'>): Promise<void> {
    const db = await this.dbPromise;
    await db.add('investments', investment);
  }

  // Fetch all investments
  async getAllInvestments(): Promise<InvestmentDB['investments']['value'][]> {
    const db = await this.dbPromise;
    return db.getAll('investments');
  }

    // Delete investments
    async deleteInvestment(id: number) {
      const db = await this.dbPromise;
      await db.delete('investments', id);
    }
}
