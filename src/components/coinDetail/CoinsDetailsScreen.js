import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, FlatList, Pressable, SectionList, Alert } from 'react-native';
import Colors from '../../resources/colors';
import Http from '../../libs/http';
import Urls from '../../libs/urls';
import Storage from '../../libs/storage';
import CoinMarketItem from './CoinMarketItem';
class CoinsDetailsScreen extends Component {
  state = {
    markets: [],
    isFavorite: false,
    coin: this.props.route.params.coin
  }

  componentDidMount() {
    const { coin } = this.state;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
    this.getFavorite();
  }

  getMarkets = async (coinId) => {
    const markets = await Http.instance.get(Urls.instance.getCoinMarketsUrl(coinId));
    this.setState({ markets });
  }

  getSection = (coin) => ([
    {
      title: 'Market Cap',
      data: [coin.market_cap_usd]
    },
    {
      title: 'Volume 24h',
      data: [coin.volume24]
    },
    {
      title: 'Change 24h',
      data: [coin.percent_change_24h]
    }
  ])

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  addFavorite = async () => {
    const { coin } = this.state;
    const coinStr = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;
    const stored = await Storage.instance.store(key, coinStr);
    if (stored) {
      this.setState({ isFavorite: true });
    }
  }

  getFavorite = async () => {
    try {
      const { coin } = this.state;
      const key = `favorite-${coin.id}`;
      const favoriteCoin = await Storage.instance.get(key);
      if (favoriteCoin !== null) {
        this.setState({ isFavorite: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const { coin } = this.state;
          const key = `favorite-${coin.id}`;
          await Storage.instance.remove(key);
          this.setState({ isFavorite: false });
        },
        style: 'destructive'
      }
    ])
  }

  render() {
    const { coin } = this.state;
    const { markets, isFavorite } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image style={styles.iconImage} source={{ uri: Urls.instance.getSymbolUrl(coin.name) }} />
            <Text style={styles.coinName}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ?
                styles.btnFavoriteRemove
                :
                styles.btnFavoriteAdd
            ]}>
            <Text style={styles.btnText}>{isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSection(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.sectionText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Market</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  coinName: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: 5
  },
  iconImage: {
    width: 25,
    height: 25
  },
  section: {
    maxHeight: 220
  },
  sectionText: {
    color: '#fff',
    fontSize: 14
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  sectionItem: {
    padding: 8
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff'
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  }
});

export default CoinsDetailsScreen;