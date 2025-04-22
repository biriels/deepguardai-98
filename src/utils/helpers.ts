
/**
 * Safely converts a value to a number for comparison
 * @param value The value to convert to a number
 * @returns The number value or 0 if conversion fails
 */
export const toNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

/**
 * Compare two values after converting them to numbers
 * @param a First value
 * @param b Second value
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 */
export const compareNumbers = (a: any, b: any): number => {
  const numA = toNumber(a);
  const numB = toNumber(b);
  
  if (numA < numB) return -1;
  if (numA > numB) return 1;
  return 0;
};
