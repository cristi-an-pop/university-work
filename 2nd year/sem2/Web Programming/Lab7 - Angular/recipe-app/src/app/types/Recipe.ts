export interface Recipe {
  [key: string]: any;
  id: number;
  author: string;
  name: string;
  type: string;
  ingredients: string;
  instructions: string;
}
