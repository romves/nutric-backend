export class NutritionPrompt {
  static generateNutrientPrompt(
    foodName: string,
    allergensArray: string[],
  ): string {
    return `Please provide the macronutrient and micronutrient information for the food item ${foodName}. Additionally, check if the food contains any of the following allergens: ${allergensArray}. The macronutrient details should include the following:
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

Respond with application/json data only, without any formatting, notes, or explanations. Use this JSON structure:

{
  "macronutrients": {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbohydrates": number
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
    return "Given an image of food, analyze the contents and provide a single-word or concise name for the type of food shown in the image. Focus on common names that best describe the food, such as 'pasta,' 'pizza,' or 'salad.' Avoid brand names or overly specific regional names. Ensure the result is descriptive yet concise. Return only the text with no additional newlines, formatting, or trailing spaces.";
  }
}
