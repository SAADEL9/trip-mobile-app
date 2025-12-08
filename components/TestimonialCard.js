import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/theme';

export default function TestimonialCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.comment}>"{item.comment}"</Text>
        <Text style={styles.name}>- {item.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 1.5,
    marginRight: SIZES.padding,
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SIZES.base,
  },
  textContainer: {
    flex: 1,
  },
  comment: {
    ...FONTS.body4,
    fontStyle: 'italic',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  name: {
    ...FONTS.h4,
    textAlign: 'right',
    color: COLORS.primary,
  },
});
