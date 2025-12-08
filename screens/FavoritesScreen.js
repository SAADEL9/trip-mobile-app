import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={80} color={COLORS.lightGray} />
      <Text style={styles.text}>No Favorites Yet</Text>
      <Text style={styles.subText}>Add places to your favorites to see them here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  text: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: SIZES.padding,
  },
  subText: {
    ...FONTS.body3,
    color: 'gray',
    marginTop: SIZES.base,
    textAlign: 'center',
  },
});

