export class Currency {
  /**
   * Convert string amount to cents
   * @param amount
   * @returns
   */
  public static stringToCents(amount: string): number {
    if (typeof amount !== 'string') throw new Error('Invalid argument type');
    let amountValue = Number(amount) * 100;
    if (typeof amount === 'string') {
      const [dollars, cents] = amount.replace(/[^0-9.]/g, '').split('.');
      if (cents !== undefined) {
        amountValue = Number(dollars) * 100;
        if (cents.length > 1) amountValue += Number(cents.slice(0, 2));
        else amountValue += Number(cents) * 10;
      }
    }
    return amountValue;
  }

  /**
   * Normalize a string amount to two decimal points
   * @param amount
   * @returns string
   */
  public static normalize(amount: string) {
    if (typeof amount === 'string') {
      const [dollars, _cents] = amount.replace(/[^0-9.]/g, '').split('.');
      let cents = _cents;
      if (cents === undefined) cents = '00';
      else if (cents.length < 2) cents = `${cents}0`;
      else if (cents.length > 2) cents = cents.substring(0, 2);
      return `${dollars ? dollars : '0'}.${cents}`;
    }
    return (Number(amount) / 100).toFixed(2);
  }

  /**
   * Format a currency with symbol
   * @param amount in string
   * @param currency 3 digit ISO Currency Code ie. USD, GBP, CAD, BDT
   * @param pre symbol is present before or after the amount
   * @returns string
   */
  public static formatWithSymbol(amount: string, currency: string, pre = true) {
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
