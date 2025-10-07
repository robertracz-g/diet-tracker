import { FoodService } from './FoodService';
import { StorageService } from './StorageService';
import { FoodItem } from '../types/FoodItem';

// Mock the StorageService
jest.mock('./StorageService', () => {
  return {
    StorageService: jest.fn().mockImplementation(() => {
      return {
        addFoodItem: jest.fn(),
        getFoodItems: jest.fn(),
      };
    }),
    storageService: {
      addFoodItem: jest.fn(),
      getFoodItems: jest.fn(),
    },
  };
});

describe('FoodService', () => {
  let foodService: FoodService;
  let mockStorageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (StorageService as jest.Mock).mockClear();
    // Now, create a new instance of the mocked service
    mockStorageService = new StorageService() as jest.Mocked<StorageService>;
    foodService = new FoodService(mockStorageService);
  });

  it('should add a food item', async () => {
    const mockFoodItem: Omit<FoodItem, 'id'> = {
      name: 'Banana',
      calories: 89,
      category: 'veggies',
      date: new Date(),
    };
    await foodService.addFoodItem(mockFoodItem);
    expect(mockStorageService.addFoodItem).toHaveBeenCalledWith(mockFoodItem);
  });

  it('should get food items', async () => {
    await foodService.getFoodItems();
    expect(mockStorageService.getFoodItems).toHaveBeenCalled();
  });

  it('should get food items for a specific date', async () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const mockItems: FoodItem[] = [
      { id: '1', name: 'Apple', calories: 52, category: 'veggies', date: today },
      { id: '2', name: 'Banana', calories: 89, category: 'veggies', date: yesterday },
    ];
    mockStorageService.getFoodItems.mockResolvedValue(mockItems);

    const items = await foodService.getFoodItemsForDate(today);
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Apple');
  });

  it('should get total calories for a specific date', async () => {
    const today = new Date();
    const mockItems: FoodItem[] = [
      { id: '1', name: 'Apple', calories: 52, category: 'veggies', date: today },
      { id: '2', name: 'Milk', calories: 42, category: 'other', date: today },
    ];
    // We need to mock the getFoodItems method on the instance for this test
    jest.spyOn(foodService, 'getFoodItemsForDate').mockResolvedValue(mockItems);


    const totalCalories = await foodService.getTotalCaloriesForDate(today);
    expect(totalCalories).toBe(94);
  });
});
