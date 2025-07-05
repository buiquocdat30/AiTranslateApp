import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserHistoryItem({ item, onPress, onDelete }) {
  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    
    return timestamp.toLocaleDateString('vi-VN');
  };

  const getLanguageName = (code) => {
    const languages = {
      'vi': 'Tiếng Việt',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어',
      'zh': '中文',
      'fr': 'Français',
      'de': 'Deutsch',
      'es': 'Español',
    };
    return languages[code] || code;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.content}>
        <View style={styles.languageInfo}>
          <View style={styles.languagePair}>
            <Text style={styles.languageCode}>
              {getLanguageName(item.sourceLanguage)}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            <Text style={styles.languageCode}>
              {getLanguageName(item.targetLanguage)}
            </Text>
          </View>
          <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.originalText} numberOfLines={2}>
            {item.originalText}
          </Text>
          <Text style={styles.translatedText} numberOfLines={2}>
            {item.translatedText}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  languageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  languagePair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  textContainer: {
    gap: 4,
  },
  originalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  translatedText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff5f5',
  },
}); 