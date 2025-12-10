import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/theme';

export default function Itinerary({ itinerary }) {
  if (!Array.isArray(itinerary) || itinerary.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Planned Journey</Text>
      {itinerary.map(item => (
        <View key={String(item.day)} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.dayBubble}>
              <Text style={styles.dayText}>Day {item.day}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Text style={styles.details}>{item.details}</Text>
          {Array.isArray(item.highlights) && item.highlights.length > 0 && (
            <View style={styles.highlights}>
              {item.highlights.map((h, i) => (
                <Text key={i} style={styles.highlight}>• {h}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 12,
  },
  header: {
    ...FONTS.h3,
    color: COLORS.accent,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dayBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  dayText: {
    color: '#fff',
    fontWeight: '700',
  },
  cardTitle: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  details: {
    ...FONTS.body4,
    color: COLORS.text,
    marginTop: 4,
    lineHeight: 18,
  },
  highlights: {
    marginTop: 8,
  },
  highlight: {
    color: COLORS.primary,
    fontSize: 13,
    marginBottom: 2,
  },
});
