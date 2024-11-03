import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../services/token.service';
import { userResponseStub } from '../test/stubs/user.stub';

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    tokenService = module.get<TokenService>(TokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('generateToken', () => {
    it('should generate token response', () => {
      const token = 'generated.jwt.token';
      mockJwtService.sign.mockReturnValue(token);

      const result = tokenService.generateToken(userResponseStub);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: userResponseStub.id,
        username: userResponseStub.username,
      });
      expect(result).toEqual({
        access_token: token,
        user: userResponseStub,
      });
    });
  });
});