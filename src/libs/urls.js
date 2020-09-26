class Urls {
  static instance = new Urls();

  constructor() {
    this.tickers = 'https://api.coinlore.net/api/tickers/';
  }
}

export default Urls;