import { FoodItem } from '../types/FoodItem';
import { storageService, StorageService } from './StorageService';

// TODO: Integrate with a nutrition API to get more accurate calorie information
// TODO: Implement more complex business logic, such as calculating macronutrient information

export class FoodService {
  constructor(private storage: StorageService) {}

  public async addFoodItem(item: Omit<FoodItem, 'id'>): Promise<FoodItem> {
    // TODO: Add validation logic here
    return this.storage.addFoodItem(item);
  }

  public async getFoodItems(): Promise<FoodItem[]> {
    return this.storage.getFoodItems();
  }

  public async getFoodItemsForDate(date: Date): Promise<FoodItem[]> {
    const items = await this.storage.getFoodItems();
    return items.filter(
      (item) => item.date.toDateString() === date.toDateString()
    );
  }

  public async getTotalCaloriesForDate(date: Date): Promise<number> {
    const items = await this.getFoodItemsForDate(date);
    return items.reduce((total, item) => total + item.calories, 0);
  }

  // TODO: Implement a more robust CSV parsing solution
  public async importFromCsv(csvData: string): Promise<void> {
    const lines = csvData.split('\n');
    // Skip the header line
    for (let i = 1; i < lines.length; i++) {
      const [name, calories, category, date] = lines[i].split(',');
      if (name && calories && category && date) {
        await this.addFoodItem({
          name,
          calories: parseInt(calories, 10),
          // TODO: Add type safety for the category
          category: category as any,
          date: new Date(date),
        });
      }
    }
  }
}

// TODO: In a real application, we would use a dependency injection container
// to manage the lifecycle of this service.
export const foodService = new FoodService(storageService);
