import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterOptions() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTakePhoto = () => {
    setModalVisible(false);
    router.push('../utils/camera');
  };

  const handleChooseFromAlbum = () => {
    setModalVisible(false);
    router.push('../utils/userPhoto');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>등록 방법 선택하기</Text>
      <Text style={styles.subHeader}>복약 정보 등록을 위해 처방전/약봉투 스캔 혹은 직접 입력 방식을 선택하세요!</Text>
      
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.title}>처방전 스캔</Text>
            <Image
              source={require('../../assets/images/medical-record(3).png')}
              style={styles.icon}
            />
            <Text style={styles.description}>처방전을 스캔하여 복약 정보를 등록하세요!</Text>
            <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
              <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>약봉투 스캔</Text>
            <Image
              source={require('../../assets/images/poly-bag.png')}
              style={styles.icon}
            />
            <Text style={styles.description}>약봉투를 스캔하여 복약 정보를 등록하세요!</Text>
            <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
              <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.title}>직접 입력</Text>
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.icon}
            />
            <Text style={styles.description}>검색을 통해 약을 직접 입력하고 등록하세요!</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push('../utils/SearchInput')}>
              <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleTakePhoto} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>사진 찍기</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleChooseFromAlbum} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>앨범에서 사진 선택</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalCancelContent}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalCancelButton}>
              <Text style={styles.modalCancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    minHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7686DB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalButton: {
    paddingVertical: 15,
  },
  modalButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  modalCancelContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  modalCancelButton: {
    paddingVertical: 15,
  },
  modalCancelButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});
