import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from '../repositories/auth.repository';
import { userStub, userResponseStub } from '../test/stubs/user.stub';
import { PrismaService } from 'src/common/db/prisma/prisma.service';
import { PrismaModule } from 'src/common/db/prisma/prisma.module';

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
      imports: [
        PrismaModule
      ]
    }).compile();

    
    authRepository = module.get<AuthRepository>(AuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      mockPrismaService.user.create.mockResolvedValue(userResponseStub);

      const result = await authRepository.createUser(
        userStub.username,
        userStub.password,
      );

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          username: userStub.username,
          password: userStub.password,
        },
        select: {
          id: true,
          username: true,
        },
      });
      expect(result).toEqual(userResponseStub);
    });
  });

  describe('findByUsername', () => {
    it('should find and return a user by username', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(userStub);

      const result = await authRepository.findByUsername(userStub.username);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { username: userStub.username },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });
      expect(result).toEqual(userStub);
    });
  });

  describe('findById', () => {
    it('should find and return a user by id', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(userResponseStub);

      const result = await authRepository.findById(userStub.id);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userStub.id },
        select: {
          id: true,
          username: true,
        },
      });
      expect(result).toEqual(userResponseStub);
    });
  });
});
