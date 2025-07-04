import React from 'react';
import { View, Text } from 'react-native';

export default function UserHistoryItem({ item }) {
  return (
    <View>
      <Text>{item.text}</Text>
      <Text>{item.translated}</Text>
    </View>
  );
} 