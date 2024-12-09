import { Module } from '@nestjs/common';
import { AllergyController } from './controllers/allergy.controller';
import { AllergyService } from './services/allergy.service';
import { AllergyRepository } from './repositories/allergy.repository';

@Module({
    controllers: [AllergyController],
    providers: [AllergyService, AllergyRepository],
    exports: [],
})
export class AllergyModule {}
