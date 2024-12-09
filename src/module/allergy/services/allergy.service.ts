import { Injectable } from '@nestjs/common';
import { AllergyRepository } from '../repositories/allergy.repository';

@Injectable()
export class AllergyService {
    constructor(private readonly allergyRepo: AllergyRepository) {}

    async getAllergies() {
        return this.allergyRepo.getAllergies();
    }
}
