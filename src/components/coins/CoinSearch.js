import React, { Component } from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from '../../resources/colors';
class CoinSearch extends Component {

  state = {
    query: ''
  }

  handleText = (query) => {
    this.setState({ query });
    if (this.props.onChange) {
      this.props.onChange(query);
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS === 'ios' ?
              styles.textInputIOS
              :
              styles.textInputAndroid
          ]}
          onChangeText={this.handleText}
          value={this.state.query}
          placeholder='Search coin'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 12,
    color: '#fff',
    width: 200,
    textAlign: 'center'
  },
  textInputAndroid: {
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
})

export default CoinSearch;