import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TranslationInput from '../components/TranslationInput';
import TranslationOutput from '../components/TranslationOutput';

export default function HomeScreen({ navigation }) {
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('vi');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleTranslate = async (text) => {
    if (!text.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập văn bản cần dịch');
      return;
    }

    setIsTranslating(true);
    try {
      // TODO: Gọi API dịch từ server
      // const response = await translateAPI(text, sourceLanguage, targetLanguage);
      // setTranslatedText(response.translatedText);
      
      // Tạm thời hiển thị text mẫu
      setTimeout(() => {
        setTranslatedText(`[Dịch từ ${sourceLanguage} sang ${targetLanguage}]: ${text}`);
        setIsTranslating(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể dịch văn bản. Vui lòng thử lại.');
      setIsTranslating(false);
    }
  };

  const handleVoiceInput = () => {
    Alert.alert('Chức năng ghi âm', 'Chức năng ghi âm sẽ được thêm sau');
  };

  const handleVoiceOutput = () => {
    if (translatedText) {
      Alert.alert('Chức năng phát âm', 'Chức năng phát âm sẽ được thêm sau');
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setTranslatedText('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Translate</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.languageContainer}>
        <View style={styles.languageBox}>
          <Text style={styles.languageLabel}>Từ</Text>
          <Text style={styles.languageText}>
            {sourceLanguage === 'vi' ? 'Tiếng Việt' : 'English'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
          <Ionicons name="swap-horizontal" size={24} color="#007AFF" />
        </TouchableOpacity>
        
        <View style={styles.languageBox}>
          <Text style={styles.languageLabel}>Sang</Text>
          <Text style={styles.languageText}>
            {targetLanguage === 'en' ? 'English' : 'Tiếng Việt'}
          </Text>
        </View>
      </View>

      <View style={styles.translationContainer}>
        <TranslationInput onTranslate={handleTranslate} />
        
        {isTranslating && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Đang dịch...</Text>
          </View>
        )}
        
        {translatedText && (
          <View style={styles.outputContainer}>
            <TranslationOutput result={translatedText} />
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleVoiceOutput}>
                <Ionicons name="volume-high" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Phát âm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="copy-outline" size={20} color="#007AFF" />
                <Text style={styles.actionButtonText}>Sao chép</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton} onPress={handleVoiceInput}>
          <Ionicons name="mic" size={24} color="#007AFF" />
          <Text style={styles.quickActionText}>Ghi âm</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('History')}
        >
          <Ionicons name="time-outline" size={24} color="#007AFF" />
          <Text style={styles.quickActionText}>Lịch sử</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  languageBox: {
    flex: 1,
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  swapButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  translationContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  outputContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    minWidth: 100,
  },
  quickActionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
}); 