import { StorageService } from './StorageService';
import { FoodItem } from '../types/FoodItem';

describe('StorageService', () => {
  let storageService: StorageService;
  const mockFoodItem: Omit<FoodItem, 'id'> = {
    name: 'Apple',
    calories: 52,
    category: 'veggies',
    date: new Date(),
  };

  beforeEach(() => {
    storageService = new StorageService();
    localStorage.clear();
  });

  it('should add a food item', async () => {
    const addedItem = await storageService.addFoodItem(mockFoodItem);
    expect(addedItem.id).toBeDefined();
    expect(addedItem.name).toBe(mockFoodItem.name);

    const items = await storageService.getFoodItems();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe(mockFoodItem.name);
  });

  it('should get food items', async () => {
    await storageService.addFoodItem(mockFoodItem);
    const items = await storageService.getFoodItems();
    expect(items.length).toBe(1);
  });

  it('should update a food item', async () => {
    const addedItem = await storageService.addFoodItem(mockFoodItem);
    const updatedItem = { ...addedItem, name: 'Granny Smith Apple' };
    await storageService.updateFoodItem(updatedItem);

    const items = await storageService.getFoodItems();
    expect(items[0].name).toBe('Granny Smith Apple');
  });

  it('should delete a food item', async () => {
    const addedItem = await storageService.addFoodItem(mockFoodItem);
    await storageService.deleteFoodItem(addedItem.id);

    const items = await storageService.getFoodItems();
    expect(items.length).toBe(0);
  });
});
