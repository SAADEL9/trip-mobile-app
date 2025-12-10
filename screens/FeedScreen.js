import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TESTIMONIALS } from '../data/testimonials';
import PostCard from '../components/PostCard';
import { COLORS, SIZES, FONTS } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = 'APP_FEED_V1';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const saved = raw ? JSON.parse(raw) : [];
        const seeded = TESTIMONIALS.map(t => ({
          id: t.id,
          name: t.name,
          avatar: t.avatar,
          text: t.comment,
          createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24),
          likes: Math.floor(Math.random() * 30),
          comments: Math.floor(Math.random() * 6),
        }));
        setPosts([...saved, ...seeded]);
      } catch (e) {
        setPosts(TESTIMONIALS.map(t => ({ id: t.id, name: t.name, avatar: t.avatar, text: t.comment, createdAt: Date.now() })));
      }
    })();
  }, []);

  const persist = async (list) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      // ignore
    }
  };

  const onPost = async () => {
    if (!name.trim() || !text.trim()) return;
    const post = {
      id: String(Date.now()),
      name: name.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=ddd&color=444`,
      text: text.trim(),
      image: image.trim() || null,
      createdAt: Date.now(),
      likes: 0,
      comments: 0,
    };

    const next = [post, ...posts];
    setPosts(next);
    await persist(next.filter(p => p.id && p.id.length && !p.id.startsWith('seed')));
    setName(''); setText(''); setImage(''); Keyboard.dismiss();
  };

  const closeComposer = () => {
    Keyboard.dismiss();
    setComposerOpen(false);
  };

  return (
    <View style={styles.container}>
      {!composerOpen ? (
        <TouchableOpacity style={styles.composerCollapsed} onPress={() => setComposerOpen(true)}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
          <Text style={styles.composerPlaceholder}>Share a post...</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.composer}>
          <View style={styles.composerHeader}>
            <Text style={styles.composerTitle}>Share a post</Text>
            <TouchableOpacity onPress={closeComposer}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <TextInput value={name} onChangeText={setName} placeholder="Your name" style={styles.input} />
          <TextInput value={image} onChangeText={setImage} placeholder="Image URL (optional)" style={styles.input} />
          <TextInput value={text} onChangeText={setText} placeholder="What's on your mind?" style={[styles.input, { height: 90 }]} multiline />
          <TouchableOpacity style={styles.postBtn} onPress={onPost}>
            <Ionicons name="cloud-upload" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={posts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  composerCollapsed: { flexDirection: 'row', alignItems: 'center', margin: SIZES.padding, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius, padding: 12, marginBottom: 12 },
  composerPlaceholder: { ...FONTS.body3, color: '#999' },
  composer: { margin: SIZES.padding, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius, padding: SIZES.padding, marginBottom: 12 },
  composerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  composerTitle: { ...FONTS.h3, color: COLORS.accent },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 8 },
  postBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 10 },
  postBtnText: { color: '#fff', fontWeight: '700' },
});
