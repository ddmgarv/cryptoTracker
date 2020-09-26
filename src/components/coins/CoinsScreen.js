import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Http from '../../libs/http';
import Urls from '../../libs/urls';

class CoinsScreen extends Component {

  state = {
    coins: []
  }

  componentDidMount = async () => {
    const coins = await Http.instance.get(Urls.instance.tickers);
    this.handleCoins(coins)
  }

  handleCoins = (coins) => {
    console.log(coins);
    this.setState({ coins }, console.log(this.state));
  }

  handlePress = () => {
    this.props.navigation.navigate('CoinDetail');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coins Screen</Text>
        <Pressable style={styles.btn} onPress={this.handlePress}>
          <Text style={styles.btnText}>Ir a detalles</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#fff'
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  }
})


export default CoinsScreen;
