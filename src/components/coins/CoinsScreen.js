import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Http from '../../libs/http';
import Urls from '../../libs/urls';
import CoinItem from './CoinItem';
import Colors from '../../resources/colors';
class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const coins = await Http.instance.get(Urls.instance.tickers);
    this.setState({ loading: false });
    this.handleCoins(coins);
  };

  handleCoins = (coins) => {
    this.setState({ coins });
  };

  handlePress = (coin) => {
    console.log(coin);
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  render() {
    const { coins, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            color="#000"
            size="large"
          />
        )}
        <FlatList
          data={coins.data}
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
