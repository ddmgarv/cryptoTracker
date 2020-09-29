import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CoinItem({ name, symbol }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16
  }
})

export default CoinItem;
