import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from '../../libs/http';
import Urls from '../../libs/urls';
import CoinItem from './CoinItem';
import Colors from '../../resources/colors';
import CoinSearch from './CoinSearch';
class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({ loading: true });
    const res = await Http.instance.get(Urls.instance.tickers);
    this.setState({
      loading: false,
      coins: res.data,
      allCoins: res.data
    });
  }

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  handleSearch = (query) => {
    const { allCoins } = this.state;
    const filteredCoins = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      )
    });
    this.setState({ coins: filteredCoins });
  }

  render() {
    const { coins, loading } = this.state;
    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            color="#000"
            size="large"
          />
        )}
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinItem
              item={item}
              onPress={this.handlePress}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.charade
  },
  title: {
    textAlign: 'center',
    color: '#fff',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
