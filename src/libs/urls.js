class Urls {
  static instance = new Urls();

  tickers = 'https://api.coinlore.net/api/tickers/';

  getSymbolUrl(name) {
    return `https://c1.coinlore.com/img/16x16/${name?.toLowerCase?.().replace(' ', '-')}.png`;
  }

  getCoinMarketsUrl(coinId) {
    return `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
  }
}

export default Urls;