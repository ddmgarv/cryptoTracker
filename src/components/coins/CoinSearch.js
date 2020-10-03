import React, { Component } from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native';

class CoinSearch extends Component {

  state = {
    query: ''
  }

  handleText = (query) => {
    this.setState({ query });

  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.handleText}
        />
      </View>
    )
  }
}
export default CoinSearch;