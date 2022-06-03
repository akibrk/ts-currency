import { Currency } from '../index';

describe('Currency', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  const AMOUNT = '22.233456';
  const AMOUNT_TWO = '14';

  it('Should format with USD currency', () => {
    expect(Currency.formatWithSymbol(AMOUNT, 'USD')).toBe('$22.23');
  });

  it('Should format with BDT post currency', () => {
    expect(Currency.formatWithSymbol(AMOUNT, 'BDT', false)).toBe('22.23৳');
  });

  it('Should normalize', () => {
    expect(Currency.normalize(AMOUNT)).toBe('22.23');
  });

  it('Should normalize till 0 digit', () => {
    expect(Currency.normalize(AMOUNT, 0)).toBe('22');
  });
  it('Should normalize till 1 digit (negative)', () => {
    expect(Currency.normalize(AMOUNT, -1)).toBe('22.2');
  });

  it('Should normalize till 1 digit', () => {
    expect(Currency.normalize(AMOUNT, 1)).toBe('22.2');
  });

  it('Should normalize till 3 digits', () => {
    expect(Currency.normalize(AMOUNT, 3)).toBe('22.233');
  });

  it('Should normalize till 3 digits (amount two)', () => {
    expect(Currency.normalize(AMOUNT_TWO, 3)).toBe('14.000');
  });

  it('Should convert to cents', () => {
    expect(Currency.stringToCents(AMOUNT)).toBe(2223);
  });
});
