import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import { PasswordService } from '../services/password.service';
import { TokenService } from '../services/token.service';
import { userStub, userResponseStub } from '../test/stubs/user.stub';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let passwordService: PasswordService;
  let tokenService: TokenService;

  const mockAuthRepository = {
    createUser: jest.fn(),
    findByUsername: jest.fn(),
    findById: jest.fn(),
  };

  const mockPasswordService = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  const mockTokenService = {
    generateToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    passwordService = module.get<PasswordService>(PasswordService);
    tokenService = module.get<TokenService>(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    const signUpDto = {
      username: 'testuser',
      password: 'password123',
    };

    it('should successfully create a new user and return token', async () => {
      mockPasswordService.hash.mockResolvedValue('hashedPassword');
      mockAuthRepository.createUser.mockResolvedValue(userResponseStub);
      mockTokenService.generateToken.mockReturnValue({
        access_token: 'token',
        user: userResponseStub,
      });

      const result = await authService.signUp(signUpDto);

      expect(passwordService.hash).toHaveBeenCalledWith(signUpDto.password);
      expect(authRepository.createUser).toHaveBeenCalledWith(
        signUpDto.username,
        'hashedPassword',
      );
      expect(tokenService.generateToken).toHaveBeenCalledWith(userResponseStub);
      expect(result).toEqual({
        access_token: 'token',
        user: userResponseStub,
      });
    });

    it('should throw UnauthorizedException when username exists', async () => {
      mockPasswordService.hash.mockResolvedValue('hashedPassword');
      mockAuthRepository.createUser.mockRejectedValue({ code: 'P2002' });

      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('signIn', () => {
    const signInDto = {
      username: 'testuser',
      password: 'password123',
    };

    it('should successfully authenticate user and return token', async () => {
      mockAuthRepository.findByUsername.mockResolvedValue(userStub);
      mockPasswordService.compare.mockResolvedValue(true);
      mockTokenService.generateToken.mockReturnValue({
        access_token: 'token',
        user: userResponseStub,
      });

      const result = await authService.signIn(signInDto);

      expect(authRepository.findByUsername).toHaveBeenCalledWith(
        signInDto.username,
      );
      expect(passwordService.compare).toHaveBeenCalledWith(
        signInDto.password,
        userStub.password,
      );
      expect(tokenService.generateToken).toHaveBeenCalledWith(userResponseStub);
      expect(result).toEqual({
        access_token: 'token',
        user: userResponseStub,
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockAuthRepository.findByUsername.mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      mockAuthRepository.findByUsername.mockResolvedValue(userStub);
      mockPasswordService.compare.mockResolvedValue(false);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});