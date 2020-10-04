import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import Colors from '../../resources/colors';

class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
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