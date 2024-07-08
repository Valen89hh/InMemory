import { randomBytes } from 'crypto';

export const generateUniqueId = (): string => {
  return randomBytes(16).toString('hex');
};