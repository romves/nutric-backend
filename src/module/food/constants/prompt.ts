export class NutritionPrompt {
  static generateNutrientPrompt(
    foodName: string,
    allergensArray: string[],
  ): string {
    return `Please provide the macronutrient and micronutrient information for the food ${foodName}. Additionally, check if the food item contains any of the following allergens: ${allergensArray}. The macronutrient details should include the following:
  - Calories (in kcal)
  - Protein (in grams)
  - Fat (in grams)
  - Carbohydrates (in grams)
  - Fiber (in grams)
  - Sugar (in grams)
  
Additionally, please include the micronutrient details, with the values for:
  - Vitamin A (in mcg)
  - Vitamin C (in mg)
  - Calcium (in mg)
  - Iron (in mg)
  - Magnesium (in mg)
  - Potassium (in mg)
  - Zinc (in mg)

Respond with application/json data only, without any formatting, notes, or explanations. Use this JSON structure:

{
  "macronutrients": {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbohydrates": number
    "fiber": number,
    "sugar": number
  },
  "micronutrients": {
    "vitamin_a": number,
    "vitamin_c": number,
    "calcium": number,
    "iron": number,
    "magnesium": number,
    "potassium": number,
    "zinc": number
  },
  "allergen_check": {
    "contains_allergens": boolean,
    "allergens_found": string[]
  }
}`;
  }

  static generateFoodNamePrompt(): string {
    return `Given an image of food, analyze the contents and provide a general name for the food shown in the image but still include the name of the main ingredients. Ensure the result is descriptive yet concise, general, not too specific. Return only the food name text with no additional newlines, formatting, stopwords, or trailing spaces.`;
  }
}
