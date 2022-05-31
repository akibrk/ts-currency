import { Currency } from '../index';

describe('Currency', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const AMOUNT = '22.233';

  it('Should format with USD currency', () => {
    expect(Currency.formatWithSymbol(AMOUNT, 'USD')).toBe('$22.23');
  });

  it('Should normalize', () => {
    expect(Currency.normalize(AMOUNT)).toBe('22.23');
  });

  it('Should convert to cents', () => {
    expect(Currency.stringToCents(AMOUNT)).toBe(2223);
  });
});
