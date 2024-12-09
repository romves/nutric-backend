export class DailyTargetCalculator {
    static calculateDailyTarget(
      height: number,
      weight: number,
      age: number,
      activityLevel: string,
      gender: string = 'male'
    ) {
      let bmr: number;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
  
      const activityMultipliers = {
        'sedentary': 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
      };
  
      const calorieTarget = bmr * (activityMultipliers[activityLevel] || 1.2);
      const proteinTarget = parseFloat((weight * 1.6).toFixed(2));
      const fatTarget = parseFloat(((calorieTarget * 0.25) / 9).toFixed(2));
      const carbCalories = calorieTarget - (proteinTarget * 4 + fatTarget * 9);
      const carbTarget = parseFloat((carbCalories / 4).toFixed(2));
      const fiberTarget = parseFloat((14 * calorieTarget / 1000).toFixed(2));
      const sugarTarget = 25;
  
      return {
        calories: parseFloat(calorieTarget.toFixed(2)),
        protein: proteinTarget,
        fat: fatTarget,
        carbohydrates: carbTarget,
        fiber: fiberTarget,
        sugar: sugarTarget,
      };
    }
  }