export interface Ingredient {
    ingredient: string;
    amount: string;
  }
  
  export interface Cocktail {
    id: string;
    name: string;
    description: string;
    category: string;
    base_spirit: string;
    history: string;
    recommendations: string;
    instructions: string;
    ingredients: Ingredient[];
    image: string;
  }
  