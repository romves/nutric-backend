import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../services/password.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  describe('hash', () => {
    it('should hash password', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordService.hash(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe('compare', () => {
    it('should return true for matching passwords', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordService.compare(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await passwordService.compare(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });
});