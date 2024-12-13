import { Controller, Get } from '@nestjs/common';
import { AllergyService } from '../services/allergy.service';

@Controller('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Get()
  async getAllergies() {
    return this.allergyService.getAllergies();
  }
}
