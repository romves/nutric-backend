import { ApiProperty } from '@nestjs/swagger';

export class PredictFoodDto {
  @ApiProperty({
    type: String,
    description: 'Name of the food',
    example: 'Burger',
  })
  foodName: string;
}
