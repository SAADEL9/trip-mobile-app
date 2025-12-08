import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../styles/theme';
// For Google Maps webview or native view
import { WebView } from 'react-native-webview';
// import MapView, { Marker } from 'react-native-maps'; // If you want native experience
// Fallback image (create a small fallback.jpg in your images folder if not present)
const FALLBACK_IMG = require('../images/Aguinane/aguinane.jpg');

// Safe image source helper

export default function DetailsScreen({ route, navigation }) {
  const { place } = route.params;
  // Defensive: gallery fallback logic
  const imgArray = Array.isArray(place.gallery) && place.gallery.length ? place.gallery : [place.image || FALLBACK_IMG];
  const ensureValidIndex = (idx) => Math.max(0, Math.min(imgArray.length - 1, idx));
  const [selectedImg, setSelectedImgRaw] = useState(0);
  const setSelectedImg = idx => setSelectedImgRaw(ensureValidIndex(idx));

  // Info chips
  const features = [
    { icon: 'alarm', label: '3j / 2n' },
    { icon: 'people', label: '8 places libres' },
    { icon: 'home', label: 'Auberge 2 étoiles' },
    { icon: 'signal-cellular-alt', label: 'Niveau: Moyen' },
  ];

  // Block for trip highlight
  const renderHighlight = () => (
    <View style={styles.highlightBlock}>
      <Ionicons name="star" size={28} color={COLORS.accent} style={{marginRight: 7}} />
      <Text style={styles.highlightText}>À vivre ce weekend: {place.name} 3j / 2n — 8 places libres</Text>
    </View>
  );

  // Image gallery
          const renderGallery = () => (
    <View style={styles.galleryWrap}>
      <Image source={imgArray[ensureValidIndex(selectedImg)]} style={styles.galleryMainImg} />
      <FlatList
        data={imgArray}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => setSelectedImg(index)}>
            <Image source={item} style={[styles.galleryThumb, selectedImg === index && styles.galleryThumbSelected]} />
          </TouchableOpacity>
        )}
        keyExtractor={(_,i) => i+''}
        horizontal
        contentContainerStyle={{marginTop: 7}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  // Fact row
  const renderFacts = () => (
    <View style={styles.factsRow}>
      {features.map(f => (
        <View key={f.label} style={styles.factChip}>
          <MaterialIcons name={f.icon} size={20} color={COLORS.primary} style={{ marginRight: 4 }} />
          <Text style={styles.factText}>{f.label}</Text>
        </View>
      ))}
    </View>
  );

  // Activities as colored chips
  const renderActivities = () => (
    <View style={styles.activitiesList}>
      {place.activities.map((a, i) => (
        <View key={i} style={styles.activityChip}>
          <Ionicons name="checkmark-circle" size={17} color={COLORS.accent} />
          <Text style={styles.activityChipText}>{a}</Text>
        </View>
      ))}
    </View>
  );

  // Sights list
  const renderSights = () => (
    <View style={{ marginBottom: 9 }}>
      <Text style={styles.infoLabel}>À voir sur place :</Text>
      {place.sights?.map((s, i) => (
        <Text key={i} style={styles.infoText}><Ionicons name="md-eye" size={13} color={COLORS.primary} /> {s}</Text>
      ))}
    </View>
  );

  // Tips list
  const renderTips = () => (
    <View style={{ marginBottom: 9 }}>
      <Text style={styles.infoLabel}>Conseils :</Text>
      {place.tips?.map((tip, i) => (
        <Text key={i} style={styles.infoText}><Ionicons name="md-information-circle-outline" size={13} color={COLORS.accent} /> {tip}</Text>
      ))}
    </View>
  );

  // Book/CTA section
  const renderBooking = () => (
    <View style={styles.bookWrap}>
      <Text style={styles.bookPrice}>{place.price} <Text style={styles.bookSmall}>par adulte</Text></Text>
      <TouchableOpacity style={styles.bookBtn}>
        <Ionicons name="paper-plane" size={20} color="#fff" style={{ marginRight: 4 }}/>
        <Text style={styles.bookBtnText}>Réserver maintenant</Text>
      </TouchableOpacity>
      <Text style={styles.bookHelp}>Contactez-nous pour options groupes & enfants :</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Ionicons name="logo-whatsapp" size={18} color="#34af23" style={{ marginRight: 3 }}/> 
        <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>+212 6 12 34 56 78</Text>
      </View>
    </View>
  );

  // Google Maps card
  const renderMap = () => {
    if (!place.location) return null;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${place.location.latitude},${place.location.longitude}`;
    const embedUrl = `https://www.google.com/maps?q=${place.location.latitude},${place.location.longitude}&z=14&output=embed`;
    // Use WebView for Google Maps embed (best on Android/iOS)
    return (
      <View style={styles.mapCard}>
        <Text style={styles.mapTitle}>Localisation</Text>
        <View style={styles.mapViewWrap}>
          <WebView
            source={{ uri: embedUrl }}
            style={{ height: 200, borderRadius: 12, overflow: 'hidden', flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
            scalesPageToFit
            startInLoadingState
          />
        </View>
        <TouchableOpacity onPress={() => { if (Platform.OS !== 'web') { require('react-native').Linking.openURL(mapUrl); }}} style={styles.mapBtn}>
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={styles.mapBtnText}>Afficher sur Google Maps</Text>
        </TouchableOpacity>
      </View>
    );
    // (Alternatively, use react-native-maps for native maps if installed)
  };

  return (
    <ScrollView style={styles.bg} showsVerticalScrollIndicator={false}>
      {renderHighlight()}
      {renderGallery()}
      <View style={styles.factsPanel}>{renderFacts()}</View>
      <View style={styles.block}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Activités incluses</Text>
        {renderActivities()}
        <View style={styles.divider} />
        {renderSights()}
        {renderTips()}
      </View>
      {renderBooking()}
      {renderMap()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: COLORS.background },
  highlightBlock: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, borderRadius: SIZES.radius, margin: SIZES.padding, marginBottom: 12, padding: 12,
    shadowColor: COLORS.primary, shadowOpacity: 0.05, shadowRadius: 7, elevation: 3,
  },
  highlightText: {
    ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold',
  },
  galleryWrap: {
    alignItems: 'center', marginBottom: 12,
  },
  galleryMainImg: {
    width: '92%', height: 220, borderRadius: SIZES.radius, resizeMode: 'cover',
  },
  galleryThumb: {
    width: 56, height: 40, borderRadius: 6, marginHorizontal: 5, marginTop: 5, borderWidth: 2, borderColor: 'transparent',
  },
  galleryThumbSelected: {
    borderColor: COLORS.accent,
  },
  factsPanel: {
    margin: SIZES.padding, marginTop: 0, padding: 13, backgroundColor: '#fff', borderRadius: SIZES.radius, elevation: 1, flexDirection: 'row', justifyContent: 'center',
  },
  factsRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
  },
  factChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, borderRadius: 16, paddingHorizontal: 11, paddingVertical: 4, marginHorizontal: 4,
  },
  factText: {
    fontSize: 13, color: COLORS.primary, fontWeight: 'bold',
  },
  block: {
    padding: SIZES.padding, backgroundColor: COLORS.lightGray, margin: SIZES.padding, borderRadius: SIZES.radius,
    marginBottom: 0,
  },
  title: {
    ...FONTS.h2, color: COLORS.text,
    marginBottom: 4,
  },
  description: {
    ...FONTS.body3, color: COLORS.text, marginBottom: 8, lineHeight: 21, minHeight: 38,
  },
  divider: {
    height: 1, backgroundColor: COLORS.primary, opacity: 0.14, marginVertical: 8,
  },
  sectionTitle: {
    ...FONTS.h3, color: COLORS.accent,
    marginBottom: 7,
  },
  activitiesList: {
    flexDirection: 'row', flexWrap: 'wrap',
  },
  activityChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 13, paddingHorizontal: 9, paddingVertical: 3, marginRight: 7, marginBottom: 6, shadowColor: COLORS.primary, shadowOpacity: 0.04, shadowRadius: 5, elevation: 1,
  },
  activityChipText: {
    color: COLORS.primary, fontWeight: 'bold', fontSize: 13, marginLeft: 4,
  },
  bookWrap: {
    backgroundColor: COLORS.primary,
    margin: SIZES.padding, marginTop: 20, marginBottom: SIZES.padding * 1.8,
    borderRadius: SIZES.radius, alignItems: 'center', padding: 24, shadowColor: COLORS.primary, shadowOpacity: 0.09, shadowRadius: 11, elevation: 2,
  },
  bookPrice: {
    ...FONTS.h1, color: '#fff', marginBottom: 5,
  },
  bookSmall: {
    ...FONTS.body3, color: COLORS.secondary,
  },
  bookBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accent, borderRadius: 24, marginVertical: 14, paddingVertical: 10, paddingHorizontal: 36,
    shadowColor: COLORS.primary, elevation: 3, shadowOpacity: 0.19, shadowRadius: 8,
  },
  bookBtnText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
  bookHelp: {
    color: COLORS.secondary, marginTop: 8, textAlign: 'center', fontSize: 13,
  },
  mapCard: {
    margin: SIZES.padding, marginTop: 20, marginBottom: SIZES.padding * 1.8,
    borderRadius: SIZES.radius, backgroundColor: '#fff', padding: 20, shadowColor: COLORS.primary, shadowOpacity: 0.09, shadowRadius: 11, elevation: 2,
  },
  mapTitle: {
    ...FONTS.h3, color: COLORS.accent, marginBottom: 10,
  },
  mapViewWrap: {
    height: 200, borderRadius: 12, overflow: 'hidden',
  },
  mapBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accent, borderRadius: 24, marginTop: 14, paddingVertical: 10, paddingHorizontal: 36,
    shadowColor: COLORS.primary, elevation: 3, shadowOpacity: 0.19, shadowRadius: 8,
  },
  mapBtnText: {
    color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 4,
  },
  infoLabel: {
    ...FONTS.h4, color: COLORS.primary, marginBottom: 5,
  },
  infoText: {
    ...FONTS.body3, color: COLORS.text, marginBottom: 3,
  },
});

