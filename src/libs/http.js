class Http {
  static instance = new Http();
  get = async (url) => {
    try {
      let req = await fetch(url, { method: 'GET' });
      let json = await req.json();
      return json;
    } catch (error) {
      console.error('Http POST method err', err.message || err);
      throw Error(error)
    }
  }
  post = async (url, body) => {
    try {
      let req = await fetch(url, { method: 'POST', body });
      let json = await req.json();
      return json;
    } catch (error) {
      console.error('Http POST method err', err.message || err);
      throw Error(error)
    }
  }
}

export default Http;