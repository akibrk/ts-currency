import { Currency } from '../index';

const amount = '23.2333';

console.log(Currency.stringToCents(amount));
console.log(Currency.normalize(amount));
console.log(Currency.formatWithSymbol(amount, 'USD'));
