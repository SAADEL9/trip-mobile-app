import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../styles/theme';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.primary} />
      </View>

      {post.text ? <Text style={styles.text}>{post.text}</Text> : null}

      {post.image ? (
        <Image source={typeof post.image === 'string' ? { uri: post.image } : post.image} style={styles.postImage} />
      ) : null}

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.action} onPress={toggleLike}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#e74c3c' : COLORS.primary} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>

        <View style={styles.action}>
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionText}>{post.comments || 0}</Text>
        </View>

        <View style={[styles.action, { marginLeft: 'auto' }]}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: SIZES.padding,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    paddingBottom: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  name: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  time: {
    ...FONTS.body5,
    color: '#8a8a8a',
    fontSize: 12,
    marginTop: 2,
  },
  text: {
    paddingHorizontal: 12,
    color: COLORS.text,
    ...FONTS.body3,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 220,
    marginTop: 8,
    resizeMode: 'cover',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 6,
    color: COLORS.primary,
  },
});
