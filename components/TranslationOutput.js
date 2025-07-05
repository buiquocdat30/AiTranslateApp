import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TranslationOutput({ result }) {
  if (!result) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kết quả dịch</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  resultContainer: {
    padding: 16,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
}); 