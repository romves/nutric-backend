export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '1h',
} as const;
