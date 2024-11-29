import { ApiProperty } from '@nestjs/swagger';

export class AddMealDto {
  @ApiProperty({
    description: 'The id of the meal',
    example: '1',
  })
  foodId: string;

  @ApiProperty({
    description: 'The serving size of the meal',
    example: 100,
  })
  servingSize: number;

  @ApiProperty({
    description: 'The serving unit of the meal',
    example: 'g',
  })
  servingUnit: string;
}
