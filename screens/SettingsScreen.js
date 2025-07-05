import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [autoSave, setAutoSave] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const settingsSections = [
    {
      title: 'Ngôn ngữ',
      items: [
        {
          id: 'defaultSource',
          title: 'Ngôn ngữ nguồn mặc định',
          subtitle: 'Tiếng Việt',
          type: 'select',
          onPress: () => Alert.alert('Thông báo', 'Chức năng chọn ngôn ngữ sẽ được thêm sau'),
        },
        {
          id: 'defaultTarget',
          title: 'Ngôn ngữ đích mặc định',
          subtitle: 'English',
          type: 'select',
          onPress: () => Alert.alert('Thông báo', 'Chức năng chọn ngôn ngữ sẽ được thêm sau'),
        },
      ],
    },
    {
      title: 'Âm thanh',
      items: [
        {
          id: 'voiceEnabled',
          title: 'Bật phát âm tự động',
          subtitle: 'Tự động phát âm sau khi dịch',
          type: 'switch',
          value: voiceEnabled,
          onValueChange: setVoiceEnabled,
        },
        {
          id: 'voiceSpeed',
          title: 'Tốc độ phát âm',
          subtitle: 'Bình thường',
          type: 'select',
          onPress: () => Alert.alert('Thông báo', 'Chức năng điều chỉnh tốc độ sẽ được thêm sau'),
        },
      ],
    },
    {
      title: 'Lưu trữ',
      items: [
        {
          id: 'autoSave',
          title: 'Tự động lưu lịch sử',
          subtitle: 'Lưu tất cả bản dịch vào lịch sử',
          type: 'switch',
          value: autoSave,
          onValueChange: setAutoSave,
        },
        {
          id: 'clearHistory',
          title: 'Xóa tất cả lịch sử',
          subtitle: 'Xóa vĩnh viễn tất cả bản dịch đã lưu',
          type: 'action',
          onPress: () => {
            Alert.alert(
              'Xóa lịch sử',
              'Bạn có chắc chắn muốn xóa tất cả lịch sử dịch? Hành động này không thể hoàn tác.',
              [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => Alert.alert('Đã xóa', 'Lịch sử đã được xóa') }
              ]
            );
          },
        },
      ],
    },
    {
      title: 'Giao diện',
      items: [
        {
          id: 'darkMode',
          title: 'Chế độ tối',
          subtitle: 'Sử dụng giao diện tối',
          type: 'switch',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          id: 'notifications',
          title: 'Thông báo',
          subtitle: 'Nhận thông báo khi có cập nhật',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
      ],
    },
    {
      title: 'Thông tin',
      items: [
        {
          id: 'about',
          title: 'Về ứng dụng',
          subtitle: 'Phiên bản 1.0.0',
          type: 'select',
          onPress: () => Alert.alert('Về ứng dụng', 'AI Translate v1.0.0\nỨng dụng dịch thuật thông minh'),
        },
        {
          id: 'privacy',
          title: 'Chính sách bảo mật',
          type: 'select',
          onPress: () => Alert.alert('Thông báo', 'Chính sách bảo mật sẽ được thêm sau'),
        },
        {
          id: 'terms',
          title: 'Điều khoản sử dụng',
          type: 'select',
          onPress: () => Alert.alert('Thông báo', 'Điều khoản sử dụng sẽ được thêm sau'),
        },
      ],
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.type === 'select' || item.type === 'action' ? item.onPress : undefined}
      disabled={item.type === 'switch'}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
        
        {item.type === 'switch' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#e0e0e0', true: '#007AFF' }}
            thumbColor={item.value ? '#fff' : '#f4f3f4'}
          />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Cài đặt</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map(renderSection)}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            AI Translate v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingText: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    padding: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
}); 