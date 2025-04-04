
/**
 * Generate a secure random password with specified options
 */
export const generatePassword = (
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean, 
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {
  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=<>?/[]{}|:;';
  
  // Build character set based on options
  let availableChars = '';
  if (includeUppercase) availableChars += uppercaseChars;
  if (includeLowercase) availableChars += lowercaseChars;
  if (includeNumbers) availableChars += numberChars;
  if (includeSymbols) availableChars += symbolChars;
  
  if (availableChars.length === 0) {
    throw new Error("At least one character type must be selected");
  }
  
  // Generate password
  let password = '';
  
  // Ensure at least one character from each selected type
  if (includeUppercase) {
    password += getRandomCharacter(uppercaseChars);
  }
  if (includeLowercase) {
    password += getRandomCharacter(lowercaseChars);
  }
  if (includeNumbers) {
    password += getRandomCharacter(numberChars);
  }
  if (includeSymbols) {
    password += getRandomCharacter(symbolChars);
  }
  
  // Fill the rest of the password with random characters
  const remainingLength = length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    password += getRandomCharacter(availableChars);
  }
  
  // Shuffle the password to make it more random
  return shuffleString(password);
};

/**
 * Get a random character from the given character set
 */
const getRandomCharacter = (characters: string): string => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

/**
 * Shuffle a string using Fisher-Yates algorithm
 */
const shuffleString = (str: string): string => {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};
