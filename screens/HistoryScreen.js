import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserHistoryItem from '../components/UserHistoryItem';

export default function HistoryScreen({ navigation }) {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dữ liệu mẫu cho lịch sử
  const sampleHistory = [
    {
      id: '1',
      originalText: 'Xin chào, tôi là người Việt Nam',
      translatedText: 'Hello, I am Vietnamese',
      sourceLanguage: 'vi',
      targetLanguage: 'en',
      timestamp: new Date(Date.now() - 3600000), // 1 giờ trước
    },
    {
      id: '2',
      originalText: 'How are you today?',
      translatedText: 'Bạn khỏe không hôm nay?',
      sourceLanguage: 'en',
      targetLanguage: 'vi',
      timestamp: new Date(Date.now() - 7200000), // 2 giờ trước
    },
    {
      id: '3',
      originalText: 'Cảm ơn bạn rất nhiều',
      translatedText: 'Thank you very much',
      sourceLanguage: 'vi',
      targetLanguage: 'en',
      timestamp: new Date(Date.now() - 86400000), // 1 ngày trước
    },
  ];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      // TODO: Gọi API để lấy lịch sử từ server
      // const response = await getHistoryAPI();
      // setHistoryItems(response.data);
      
      // Tạm thời sử dụng dữ liệu mẫu
      setTimeout(() => {
        setHistoryItems(sampleHistory);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải lịch sử dịch');
      setIsLoading(false);
    }
  };

  const handleItemPress = (item) => {
    // Chuyển về màn hình chính với dữ liệu đã chọn
    navigation.navigate('Home', { 
      originalText: item.originalText,
      sourceLanguage: item.sourceLanguage,
      targetLanguage: item.targetLanguage 
    });
  };

  const handleDeleteItem = (itemId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa mục này khỏi lịch sử?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setHistoryItems(prev => prev.filter(item => item.id !== itemId));
            // TODO: Gọi API để xóa khỏi server
          }
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Xóa tất cả lịch sử',
      'Bạn có chắc chắn muốn xóa tất cả lịch sử dịch?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: () => {
            setHistoryItems([]);
            // TODO: Gọi API để xóa tất cả khỏi server
          }
        }
      ]
    );
  };

  const renderHistoryItem = ({ item }) => (
    <UserHistoryItem
      item={item}
      onPress={() => handleItemPress(item)}
      onDelete={() => handleDeleteItem(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="time-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Chưa có lịch sử dịch</Text>
      <Text style={styles.emptySubtitle}>
        Các bản dịch của bạn sẽ xuất hiện ở đây
      </Text>
      <TouchableOpacity 
        style={styles.startTranslateButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.startTranslateText}>Bắt đầu dịch</Text>
      </TouchableOpacity>
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
        <Text style={styles.title}>Lịch sử dịch</Text>
        {historyItems.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải lịch sử...</Text>
        </View>
      ) : (
        <FlatList
          data={historyItems}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  startTranslateButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startTranslateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 