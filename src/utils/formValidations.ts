import { capitalize } from '@mui/material';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import { config } from './config';
import { messages } from './messages';

export const isValidEmail = (email: string) => {
  return isEmail(email) ? undefined : capitalize(messages.FORM_EMAIL_INVALID);
};

export const isValidName = (name: string) => {
  name = name.trim();
  // const wordCount = name.split(' ').filter((str) => str.length).length;
  // if (wordCount < 2) return 'PLease provide first name & surname';

  if (name.length < config.NAME_MIN_LENGTH) return capitalize(messages.USER_INVALID_NAME);

  return isAlphanumeric(name, 'es-ES', { ignore: ' ' })
    ? undefined
    : capitalize(messages.USER_INVALID_NAME);
};

export const isValidPassword = (password: string) => {
  return isStrongPassword(password, {
    minLength: 6,
    minLowercase: 2,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
    ? undefined
    : capitalize(messages.USER_INVALID_PASSWORD);
};

export const isPasswordMatch = (password: string) => (confirmPassword: string) => {
  return password === confirmPassword ? undefined : "Passwords don't match";
};
