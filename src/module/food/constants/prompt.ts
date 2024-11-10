export class NutritionPrompt {
  static generateNutrientPrompt(foodName: string, allergensArray: string[]): string {
    return `Please provide the macronutrient and micronutrient information for the food item '${foodName}'. Additionally, check if the food contains any of the following allergens: '${allergensArray}'. The macronutrient details should include the following:
  - Calories (in kcal)
  - Protein (in grams)
  - Fat (in grams)
  - Carbohydrates (in grams)
  
Additionally, please include the micronutrient details, with the values for:
  - Vitamin A (in mcg)
  - Vitamin C (in mg)
  - Calcium (in mg)
  - Iron (in mg)
  - Magnesium (in mg)
  - Potassium (in mg)
  - Zinc (in mg)

Please respond only with the JSON data in the following format:
{
  "macronutrients": {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbohydrates": number
  },
  "micronutrients": {
    "vitaminA": number,
    "vitaminC": number,
    "calcium": number,
    "iron": number,
    "magnesium": number,
    "potassium": number,
    "zinc": number
  },
  "allergen_check": {
    "contains_allergens": boolean,
    "allergens_found": ["allergen1", "allergen2", ...]
  }
}`;
  }
}
