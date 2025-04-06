export interface Ingredient {
    ingredient: string;
    amount: string;
  }
  
  export interface Cocktail {
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
  