import { FoodItem } from '../types/FoodItem';

// TODO: Implement a more robust error handling mechanism
// TODO: Add methods for fetching data for specific date ranges (weekly/monthly summaries)

const STORAGE_KEY = 'diet-tracker-data';

export class StorageService {
  // TODO: Implement a singleton pattern for this service
  constructor() {}

  public async addFoodItem(item: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    const items = await this.getFoodItems();
    const newItem = { ...item, id: new Date().toISOString() };
    items.push(newItem);
    this.saveFoodItems(items);
    return newItem;
  }

  public async getFoodItems(): Promise<FoodItem[]> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        // The date is stored as a string, so we need to convert it back to a Date object
        const items = JSON.parse(data).map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }));
        resolve(items);
      } else {
        resolve([]);
      }
    });
  }

  public async updateFoodItem(updatedItem: FoodItem): Promise<FoodItem> {
    const items = await this.getFoodItems();
    const index = items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      this.saveFoodItems(items);
    }
    return updatedItem;
  }

  public async deleteFoodItem(id: string): Promise<void> {
    const items = await this.getFoodItems();
    const filteredItems = items.filter((item) => item.id !== id);
    this.saveFoodItems(filteredItems);
  }

  private saveFoodItems(items: FoodItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

// TODO: In a real application, we would use a dependency injection container
// to manage the lifecycle of this service.
export const storageService = new StorageService();
