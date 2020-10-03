import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, FlatList, SectionList } from 'react-native';
import Colors from '../../resources/colors';
import Http from '../../libs/http';
import Urls from '../../libs/urls';
import CoinMarketItem from './CoinMarketItem';

class CoinsDetailsScreen extends Component {
  state = {
    markets: []
  }

  componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
  }

  getMarkets = async (coinId) => {
    const markets = await Http.instance.get(Urls.instance.getCoinMarketsUrl(coinId));
    console.log('MARKETS: ', markets);
    this.setState({ markets });
  };

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

  render() {
    const { coin } = this.props.route.params;
    const { markets } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image style={styles.iconImage} source={{ uri: Urls.instance.getSymbolUrl(coin.name) }} />
          <Text style={styles.coinName}>{coin.name}</Text>
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
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  coinName: {
    color: '#fff',
    fontSize: 14
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
    flexDirection: 'row'
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
  }
});

export default CoinsDetailsScreen;