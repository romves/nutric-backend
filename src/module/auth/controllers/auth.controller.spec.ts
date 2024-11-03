// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from '../controllers/auth.controller';
// import { AuthService } from '../services/auth.service';
// import { userResponseStub } from '../test/stubs/user.stub';

// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;

//   const mockAuthService = {
//     signUp: jest.fn(),
//     signIn: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: AuthService,
//           useValue: mockAuthService,
//         },
//       ],
//     }).compile();

//     authController = module.get<AuthController>(AuthController);
//     authService = module.get<AuthService>(AuthService);
//   });

//   describe('signUp', () => {
//     it('should create a new user', async () => {
//       const authDto = {
//         username: 'testuser',
//         password: 'password123',
//       };

//       const expectedResponse = {
//         access_token: 'token',
//         user: userResponseStub,
//       };

//       mockAuthService.signUp.mockResolvedValue(expectedResponse);

//       const result = await authController.signUp(authDto);

//       expect(authService.signUp).toHaveBeenCalledWith(authDto);
//       expect(result).toEqual(expectedResponse);
//     });
//   });

//   describe('signIn', () => {
//     it('should authenticate user', async () => {
//       const authDto = {
//         username: 'testuser',
//         password: 'password123',
//       };

//       const expectedResponse = {
//         access_token: 'token',
//         user: userResponseStub,
//       };

//       mockAuthService.signIn.mockResolvedValue(expectedResponse);

//       const result = await authController.signIn(authDto);

//       expect(authService.signIn).toHaveBeenCalledWith(authDto);
//       expect(result).toEqual(expectedResponse);
//     });
//   });
// });