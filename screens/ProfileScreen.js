import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/theme';

export default function ProfileScreen() {
  const profile = {
    name: 'Amine El Idrissi',
    email: 'amine@trailflow.ma',
    role: 'Outdoor Guide',
    location: 'Marrakech, Morocco',
    bio: 'Designs multi-day treks, tests gear on weekends, and chases golden-hour shots.',
    stats: [
      { label: 'Treks Led', value: '48' },
      { label: 'Reviews', value: '4.9★' },
      { label: 'Gear Tested', value: '67' },
    ],
    // use a male portrait
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.cover }} style={styles.cover} />
      <View style={styles.card}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{profile.role}</Text>
        <Text style={styles.location}>{profile.location}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.statsRow}>
          {profile.stats.map(stat => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cover: {
    width: '100%',
    height: 190,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 18,
    marginTop: -50,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  card: {
    marginHorizontal: SIZES.padding,
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: -SIZES.padding * 1.2,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    alignItems: 'center',
  },
  name: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: SIZES.base,
    marginBottom: 4,
  },
  role: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: '700',
    marginBottom: 2,
  },
  location: {
    ...FONTS.body4,
    color: '#6c757d',
    marginBottom: 6,
  },
  email: {
    ...FONTS.body4,
    color: '#7a7a7a',
    marginBottom: 10,
  },
  bio: {
    ...FONTS.body3,
    color: '#4d4d4d',
    textAlign: 'center',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  statLabel: {
    ...FONTS.body4,
    color: '#6c757d',
  },
});

