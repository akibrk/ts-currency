export class Currency {
  /**
   * Convert string amount to cents
   * @param amount
   * @returns
   */
  public static stringToCents(amount: string): number {
    if (typeof amount !== 'string') throw new Error('Invalid argument type');

    amount = amount.replace(/[\s,] /g, ''); // replace all spaces and commas
    const isValidAmount = amount.match(/^[0-9]{0,128}\.?[0-9]{0,128}$/g); // Check the formatting
    if (!isValidAmount) {
      throw new Error('Malformed argument');
    }

    const [whole, decimal] = amount.split('.');
    const decimalAmount: number = decimal ? Number(decimal.slice(0, 2)) : 0;
    const amountInCents: number = Number(whole) * 100 + decimalAmount;
    return amountInCents;
  }

  /**
   * Normalize a string amount to n decimal points
   * @param amount
   * @returns string
   */
  public static normalize(amount: string, points: number = 2): string {
    if (typeof amount !== 'string') {
      throw new Error(`Invalid Argument: Expected string got ${typeof amount}`);
    }

    amount = amount.replace(/[\s,] /g, ''); // replace all spaces and commas
    const isValidAmount = amount.match(/^[0-9]{0,128}\.?[0-9]{0,128}$/g); // Check the formatting
    if (!isValidAmount) {
      throw new Error('Malformed argument');
    }

    return Number(amount).toFixed(Math.abs(Math.round(points)));
  }

  /**
   * Format a currency with symbol
   * @param amount in string
   * @param currency 3 digit ISO Currency Code ie. USD, GBP, CAD, BDT, EUR, JPY
   * @param pre symbol is present before or after the amount
   * @returns string
   */
  public static formatWithSymbol(amount: string, currency: string, pre = true, fix: number = 2): string {
    if (typeof amount != 'number' && typeof amount != 'string') {
      throw new Error('Invalid argument type');
    }
    const currencySymbols = new Map([
      ['USD', '$'],
      ['CAD', '$'],
      ['MXN', '$'],
      ['NZD', '$'],
      ['AUD', '$'],
      ['BDT', '৳'],
      ['EUR', '€'],
      ['GBP', '£'],
      ['INR', '₹'],
      ['BTC', '₿'],
      ['JPY', '¥'],
      ['RUB', '₽'],
    ]);
    currency = currency ? currency.toUpperCase() : 'USD';
    let symbol = currencySymbols.get(currency) || '$';
    // Convert to dollar amount from cents
    let amountValue = Number(amount);
    if (typeof amount === 'string') {
      amountValue = this.stringToCents(amount);
    }
    const formattedAmount = pre
      ? `${symbol}${(amountValue / 100).toFixed(2)}`
      : `${(amountValue / 100).toFixed(2)}${symbol}`;
    return formattedAmount;
  }
}
