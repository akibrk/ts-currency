export class Currency {
  /**
   *
   * @param dollar
   * @returns
   */
  public stringToCents(dollar: string): number {
    const amounts = dollar.split('.');
    const centAmount: number = Number(amounts[0]) * 100;
    const totalAmount = centAmount + amounts.length > 1 ? Number(amounts[1]) : 0;

    return totalAmount;
  }

  /**
   *
   * @param amount
   * @returns
   */
  public normalize(amount: string) {
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
   *
   * @param amount
   * @param currency
   * @param pre
   * @returns
   */
  public formatWithSymbol(amount: string, currency: string, pre = true) {
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
