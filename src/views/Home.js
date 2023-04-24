import React, { useContext, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as images from '../../assets';
import StoreModal from '../components/StoreModal';
import { StoreContext } from '../contexts/StoreContext';

const Home = () => {
  const [currentStore, setCurrentStore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { stores } = useContext(StoreContext);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentStore(null);
  };

  const handleOpenModal = (store) => {
    setIsModalVisible(true);
    setCurrentStore(store);
  };

  return (
    <View style={styles.container}>
      {
        stores?.map((store) => (
          <Pressable
            key={store.id}
            onPress={() => handleOpenModal(store)}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>{store.name}</Text>
            <Image
              source={images[`image_${store.id}`]}
              style={styles.image}
            />
          </Pressable>
        ))
      }
      {currentStore && (
        <StoreModal
          closeModal={handleCloseModal}
          isModalVisible={isModalVisible}
          storeData={currentStore}
        />
      )}
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "space-evenly",
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: "grey",
    position: "relative",
    width: 250,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    position: "absolute",
    textAlign: "center",
    top: 50,
    zIndex: 1,
  },
  image: {
    opacity: 0.5,
    width: 250,
  },
});

export default Home;
