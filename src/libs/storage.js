import AsyncStorage from '@react-native-community/async-storage';
class Storage {

  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error in store method, msg: ', error);
      throw Error(error)
    }
  }

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error in get method, msg: ', error);
      throw Error(error)
    }
  }

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error in remove method, msg: ', error);
      throw Error(error)
    }
  }

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error in getAllKeys method, msg: ', error);
      throw Error(error)
    }
  }

  getMulti = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error in getMulti method, msg: ', error);
      throw Error(error)
    }
  }
}

export default Storage;