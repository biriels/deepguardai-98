
/**
 * Safely converts a value to a number for comparison
 * @param value The value to convert to a number
 * @returns The number value or 0 if conversion fails
 */
export const toNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};
