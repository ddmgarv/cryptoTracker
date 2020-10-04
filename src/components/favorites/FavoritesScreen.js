import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinItem from '../coins/CoinItem';
import Colors from '../../resources/colors';
import Storage from '../../libs/storage';

class FavoritesScreen extends Component {

  state = {
    favorites: []
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keysFiltered = allKeys.filter(key => key.includes('favorite-'));
      const favsData = await Storage.instance.getMulti(keysFiltered);
      const favorites = favsData.map(fav => JSON.parse(fav[1]));
      this.setState({ favorites })
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getFavorites();
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  }

  render() {
    const { favorites } = this.state;
    return (
      <View style={styles.container}>
        {favorites.length === 0 ?
          <FavoritesEmptyState />
          :
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <CoinItem
                item={item}
                onPress={() => this.handlePress(item)}
              />
            )}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  }
});

export default FavoritesScreen;