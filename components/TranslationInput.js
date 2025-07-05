import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TranslationInput({ onTranslate }) {
  const [text, setText] = useState('');

  const handleTranslate = () => {
    if (text.trim()) {
      onTranslate(text);
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Nhập văn bản cần dịch..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          maxLength={1000}
        />
        {text.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearText}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.actions}>
        <View style={styles.characterCount}>
          <Text style={styles.characterText}>
            {text.length}/1000
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.translateButton,
            text.trim().length === 0 && styles.translateButtonDisabled
          ]}
          onPress={handleTranslate}
          disabled={text.trim().length === 0}
        >
          <Ionicons 
            name="language" 
            size={20} 
            color={text.trim().length === 0 ? "#ccc" : "#fff"} 
          />
          <Text style={[
            styles.translateButtonText,
            text.trim().length === 0 && styles.translateButtonTextDisabled
          ]}>
            Dịch
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  characterCount: {
    flex: 1,
  },
  characterText: {
    fontSize: 12,
    color: '#999',
  },
  translateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  translateButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  translateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  translateButtonTextDisabled: {
    color: '#ccc',
  },
}); 