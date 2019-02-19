import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Loader = () => <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#f4511e" /></View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
