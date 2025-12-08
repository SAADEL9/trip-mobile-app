import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SHOP_ITEMS } from '../data/shop';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const SHOP_HERO = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

export default function ShopScreen() {
  // Shop hero/banner
  const renderBanner = () => (
    <ImageBackground source={{ uri: SHOP_HERO }} style={styles.banner} imageStyle={{ borderRadius: SIZES.radius }}>
      <View style={styles.bannerOverlay} />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>Boutique Outdoor</Text>
        <Text style={styles.bannerSubtitle}>Équipez-vous pour l'aventure : sacs, équipements, accessoires, et plus !</Text>
      </View>
    </ImageBackground>
  );

  // Product feature chips (static example for now)
  const renderFeatures = () => [
    <View key="durable" style={styles.featureChip}><Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Durable</Text></View>,
    <View key="light" style={styles.featureChip}><Ionicons name="walk" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Léger</Text></View>,
    <View key="waterproof" style={styles.featureChip}><Ionicons name="water" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Imperméable</Text></View>
  ];

  // Rich shop item card
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.featuresRow}>{renderFeatures()}</View>
        <View style={styles.footer}>
          <View style={styles.priceBadge}><Text style={styles.priceText}>{item.price}</Text></View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ajouter au Panier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Footer/info block
  const renderFooter = () => (
    <View style={styles.shopFooter}>
      <Text style={styles.footerTitle}>Pourquoi acheter chez nous ?</Text>
      <Text style={styles.footerText}>- Livraison rapide & gratuite à partir de 500 MAD
- Matériel testé et garanti
- Paiement sécurisé
- Service client dédié</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {renderBanner()}
          <Text style={styles.title}>Nos produits</Text>
        </>
      }
      data={SHOP_ITEMS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ paddingBottom: SIZES.padding * 2, paddingTop: 6 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 190,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginTop: SIZES.padding / 2,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,92,99,0.27)',
  },
  bannerContent: {
    padding: SIZES.padding,
    zIndex: 2,
  },
  bannerTitle: {
    ...FONTS.h1,
    color: '#fff',
    marginBottom: 5,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  bannerSubtitle: {
    ...FONTS.h3,
    color: '#f8f8ff',
    marginBottom: 12,
  },
  title: {
    ...FONTS.h2,
    marginBottom: 12,
    color: COLORS.primary,
    marginLeft: 6,
  },
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
  },
  infoContainer: {
    padding: SIZES.padding / 1.2,
  },
  name: {
    ...FONTS.h3,
    marginBottom: SIZES.base / 1.5,
    color: COLORS.text,
  },
  description: {
    ...FONTS.body4,
    color: '#4e4e4e',
    marginBottom: 4,
  },
  featuresRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 10,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 8,
    elevation: 1,
    marginBottom: 5,
  },
  featureText: {
    marginLeft: 4,
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
  priceText: {
    color: '#fff', fontWeight: 'bold', fontSize: 15,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
  },
  buttonText: {
    ...FONTS.body4,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  shopFooter: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
    padding: SIZES.padding,
    alignItems: 'flex-start',
  },
  footerTitle: {
    ...FONTS.h2,
    color: '#fff',
    marginBottom: 6,
  },
  footerText: {
    ...FONTS.body3,
    color: COLORS.secondary,
    lineHeight: 22,
  },
});
