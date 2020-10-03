import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import Colors from 'cryptoTracker/src/resources/colors.js';

function CoinItem({ item, onPress }) {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png');
    }
  }
  return (
    <Pressable onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imgIcon} source={getImageArrow()} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0
  },
  row: {
    flexDirection: 'row'
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 16
  },
  percentText: {
    color: '#fff',
    fontSize: 12
  },
  priceText: {
    color: '#fff',
    fontSize: 14
  },
  imgIcon: {
    width: 20,
    height: 20,
    marginLeft: 8
  }
});

export default CoinItem;
