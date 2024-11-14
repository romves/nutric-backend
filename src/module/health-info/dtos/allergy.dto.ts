// create-allergy.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateAllergyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  health_info_id: string;
}
