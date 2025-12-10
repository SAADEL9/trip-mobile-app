import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { SHOP_ITEMS } from '../data/shop';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const SHOP_HERO = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const STATIC_CART = {
  items: [
    { name: 'Daypack 20L', qty: 1, price: '320 MAD' },
    { name: 'LED Headlamp Pro', qty: 1, price: '160 MAD' },
  ],
  total: '480 MAD',
  note: 'Static preview cart. Hook to backend/checkout later.',
};

export default function ShopScreen() {
  // Shop hero/banner
  const renderBanner = () => (
    <ImageBackground source={{ uri: SHOP_HERO }} style={styles.banner} imageStyle={{ borderRadius: SIZES.radius }}>
      <View style={styles.bannerOverlay} />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>Outdoor Store</Text>
        <Text style={styles.bannerSubtitle}>Gear up for adventure: packs, lighting, protection, and more.</Text>
      </View>
    </ImageBackground>
  );

  // Product feature chips (static example for now)
  const renderFeatures = () => [
    <View key="durable" style={styles.featureChip}><Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Durable</Text></View>,
    <View key="light" style={styles.featureChip}><Ionicons name="walk" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Lightweight</Text></View>,
    <View key="waterproof" style={styles.featureChip}><Ionicons name="water" size={16} color={COLORS.primary} />
      <Text style={styles.featureText}>Waterproof</Text></View>
  ];

  // Rich shop item card
  const renderItem = ({ item }) => {
    const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.featuresRow}>{renderFeatures()}</View>
        <View style={styles.footer}>
          <View style={styles.priceBadge}><Text style={styles.priceText}>{item.price}</Text></View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    );
  };

  const renderStaticCart = () => (
    <View style={styles.cartCard}>
      <View style={styles.cartHeader}>
        <Ionicons name="cart" size={18} color={COLORS.primary} />
        <Text style={styles.cartTitle}>Your Cart (static preview)</Text>
      </View>
      {STATIC_CART.items.map(item => (
        <View key={item.name} style={styles.cartRow}>
          <Text style={styles.cartItemName}>{item.qty}× {item.name}</Text>
          <Text style={styles.cartItemPrice}>{item.price}</Text>
        </View>
      ))}
      <View style={styles.cartDivider} />
      <View style={styles.cartRow}>
        <Text style={styles.cartTotalLabel}>Total</Text>
        <Text style={styles.cartTotalValue}>{STATIC_CART.total}</Text>
      </View>
      <Text style={styles.cartNote}>{STATIC_CART.note}</Text>
    </View>
  );

  // Footer/info block
  const renderFooter = () => (
    <View style={styles.shopFooter}>
      <Text style={styles.footerTitle}>Why shop with us?</Text>
      <Text style={styles.footerText}>- Fast delivery, free over 500 MAD
- Field-tested gear
- Secure payments
- Friendly support</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          {renderBanner()}
          <Text style={styles.title}>Our Products</Text>
        </>
      }
      data={SHOP_ITEMS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListFooterComponent={
        <>
          {renderStaticCart()}
          {renderFooter()}
        </>
      }
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
    resizeMode: 'contain',
    backgroundColor: '#f8f9fb',
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
  cartCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cartTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    fontWeight: '700',
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cartItemName: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  cartItemPrice: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cartDivider: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 8,
  },
  cartTotalLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: '700',
  },
  cartTotalValue: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: '700',
  },
  cartNote: {
    ...FONTS.body4,
    color: '#6c757d',
    marginTop: 6,
  },
});
