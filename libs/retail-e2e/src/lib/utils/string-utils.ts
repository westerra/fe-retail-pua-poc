import { US_CURRENCY } from '../data/general.data';
import { randomInt } from 'crypto';

export const amountToNumber = (value: string) => {
  //Immediate implementation that works for US formats where comma is thousand separator
  const sanitizedAmount = value.replace(US_CURRENCY, '');
  return parseFloat(sanitizedAmount.replace(',', ''));
};

export const generateUniqueString = () => {
  const currentDate = new Date().toLocaleDateString();
  return `AutomaticallyGenerated_${currentDate}_${randomInt(10000)}`;
};
