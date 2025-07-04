import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function TranslationInput({ onTranslate }) {
  const [text, setText] = React.useState('');
  return (
    <View>
      <TextInput value={text} onChangeText={setText} placeholder="Nhập văn bản..." />
      <Button title="Dịch" onPress={() => onTranslate(text)} />
    </View>
  );
} 