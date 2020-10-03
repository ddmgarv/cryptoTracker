import React, { Component } from 'react'
import { View, Text } from 'react-native';

class CoinsDetailsScreen extends Component {

  render() {
    const { coin } = this.props.route.params;
    return (
      <View>
        <Text>Coin Detail Screen</Text>
      </View>
    )
  }
}

export default CoinsDetailsScreen