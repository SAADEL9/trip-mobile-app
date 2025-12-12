import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLACES } from '../data/places';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = 'APP_BOOKINGS_V1';

export default function BookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const saved = raw ? JSON.parse(raw) : null;
        if (saved && Array.isArray(saved)) {
          setBookings(saved);
        } else {
          // seed example bookings from PLACES
          const seeded = PLACES.slice(0, 2).map((p, i) => ({
            id: String(Date.now() + i),
            placeId: p.id,
            placeName: p.name,
            startDate: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
            endDate: new Date(Date.now() + (i + 3) * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
            price: p.price,
          }));
          setBookings(seeded);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
        }
      } catch (e) {
        console.warn('Bookings load failed', e);
      }
    })();
  }, []);

  const cancelBooking = (id) => {
    Alert.alert('Cancel booking', 'Are you sure you want to cancel this booking?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: async () => {
        const next = bookings.filter(b => b.id !== id);
        setBookings(next);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } }]
    );
  };

  const viewDetails = (b) => {
    const place = PLACES.find(p => p.id === b.placeId) || PLACES[0];
    navigation.navigate('Details', { place });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.place}>{item.placeName}</Text>
          <Text style={styles.dates}>{item.startDate} → {item.endDate}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => viewDetails(item)}>
          <Ionicons name="eye" size={16} color={COLORS.primary} />
          <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#fff' }]} onPress={() => cancelBooking(item.id)}>
          <Ionicons name="trash" size={16} color="#e74c3c" />
          <Text style={[styles.btnText, { color: '#e74c3c' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList data={bookings} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.padding },
  header: { ...FONTS.h2, color: COLORS.text, marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  place: { ...FONTS.h4, color: COLORS.text },
  dates: { ...FONTS.body4, color: '#6c757d' },
  price: { ...FONTS.h4, color: COLORS.primary },
  actions: { flexDirection: 'row', marginTop: 10 },
  btn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, marginRight: 8 },
  btnText: { marginLeft: 6, color: COLORS.primary, fontWeight: '700' },
});
