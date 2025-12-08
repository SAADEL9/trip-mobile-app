import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';
import { PLACES } from '../data/places';
import { TESTIMONIALS } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
const LOGO_IMAGE = 'https://triplan.ma/wp-content/uploads/2023/08/logo_blanc-1.png'; // use a placeholder if needed

const FILTERS = [
  { label: 'Randonnée', icon: 'terrain', color: COLORS.primary },
  { label: 'Aventure', icon: 'whatshot', color: COLORS.accent },
  { label: 'Nature', icon: 'eco', color: '#3cb371' },
  { label: 'Désert', icon: 'waves', color: '#ff8c42' },
  { label: 'Mer', icon: 'beach-access', color: '#36a3d9' },
];

export default function HomeScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('');

  // Demo banner/hero
  const renderHero = () => (
    <ImageBackground source={{ uri: HERO_IMAGE }} style={styles.hero} imageStyle={{ borderRadius: SIZES.radius, resizeMode: 'cover' }}>
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>
        <Image source={{ uri: LOGO_IMAGE }} style={styles.logo} />
        <Text style={styles.heroTitle}>Explorez le Maroc Authentique</Text>
        <Text style={styles.heroSubtitle}>Voyages en groupe, teambuilding, aventures nature & bien plus encore.</Text>
        <TouchableOpacity style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>Voir les Offres</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  // Filter bar as colored chips
  const renderFilterBar = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 12 }}>
      {FILTERS.map((filter, idx) => (
        <TouchableOpacity
          key={filter.label}
          onPress={() => setActiveFilter(filter.label)}
          style={[styles.filterChip, { backgroundColor: filter.color, opacity: activeFilter === filter.label ? 1 : 0.6 }]}
        >
          <MaterialIcons name={filter.icon} size={18} color="#fff" style={{ marginRight: 6 }} />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{filter.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Trip card styled richer
  const renderPlace = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { place: item })}>
      <ImageBackground source={item.image} style={styles.cardImage} imageStyle={{ borderRadius: SIZES.radius }}>
        <View style={styles.cardOverlay} />
        <View style={styles.cardInfoBar}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.priceBadge}><Text style={styles.priceText}>{item.price}</Text></View>
        </View>
        <View style={styles.spotsBadge}><Ionicons name="person" size={14} color="#fff" /><Text style={styles.spotsText}> 7 places libres</Text></View>
      </ImageBackground>
      <View style={styles.cardDetails}>
        <Text style={styles.cardDesc}>{item.description}</Text>
        <View style={styles.activityChips}>
          {item.activities.map((a, i) => (
            <View key={i} style={styles.activityChip}><Text style={styles.activityChipText}>{a}</Text></View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Testimonial section inside a colored panel
  const renderTestimonialsBanner = () => (
    <View style={styles.testimonialSection}>
      <Text style={styles.testimonialTitle}>Ils ont voyagé avec nous</Text>
      <FlatList
        data={TESTIMONIALS}
        renderItem={({ item }) => <TestimonialCard item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingRight: 12 }}
      />
    </View>
  );

  return (
    <ScrollView style={styles.bg} showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: SIZES.padding }}>
        {renderHero()}
      </View>
      <View style={{ marginBottom: SIZES.padding }}>
        <Text style={styles.sectionTitle}>Recherchez votre aventure</Text>
        {renderFilterBar()}
      </View>
      <Text style={styles.sectionTitle}>Offres Populaires</Text>
      <FlatList
        data={PLACES}
        renderItem={renderPlace}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: SIZES.padding }}
      />
      {renderTestimonialsBanner()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: COLORS.background },
  hero: {
    height: 270,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginTop: SIZES.padding,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,92,99,0.33)',
  },
  heroContent: {
    padding: SIZES.padding,
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    width: 104,
    height: 38,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  heroTitle: {
    ...FONTS.h1,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    ...FONTS.h3,
    color: '#f9f9f9',
    marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 26,
    alignSelf: 'flex-start',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroBtnText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 12,
    elevation: 2,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    marginBottom: 10,
    marginLeft: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
  },
  cardImage: {
    height: 165,
    width: '100%',
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.23)',
    zIndex: 2,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
  },
  cardInfoBar: {
    position: 'absolute',
    left: 0,
    bottom: 12,
    paddingHorizontal: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9,
  },
  cardName: {
    color: '#fff',
    ...FONTS.h2,
    textShadowColor: 'rgba(0,0,0,0.36)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  priceBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    alignSelf: 'flex-end',
  },
  priceText: {
    color: '#fff', fontWeight: 'bold', fontSize: 14,
  },
  spotsBadge: {
    position: 'absolute',
    left: 12,
    top: 10,
    backgroundColor: '#29ba5e',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 10,
    elevation: 1,
  },
  spotsText: {
    color: '#fff', fontWeight: 'bold', marginLeft: 3, fontSize: 13,
  },
  cardDetails: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  cardDesc: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: 4,
    minHeight: 36,
  },
  activityChips: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  activityChip: {
    marginRight: 8, marginBottom: 5, backgroundColor: COLORS.secondary, borderRadius: 12, paddingVertical: 3, paddingHorizontal: 10,
  },
  activityChipText: {
    fontSize: 13, color: COLORS.text, fontWeight: 'bold',
  },
  testimonialSection: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    padding: SIZES.padding,
    marginBottom: SIZES.padding * 1.2,
  },
  testimonialTitle: {
    ...FONTS.h2, color: COLORS.primary, marginBottom: 14,
  },
});

