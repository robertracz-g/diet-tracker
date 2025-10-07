// TODO: Add more specific categories
export type FoodCategory = 'fish' | 'meat' | 'veggies' | 'sugar' | 'alcohol' | 'other';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  category: FoodCategory;
  date: Date;
}
