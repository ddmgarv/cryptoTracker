import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function FavoritesEmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You don't have any favorites yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  }
})
export default FavoritesEmptyState;