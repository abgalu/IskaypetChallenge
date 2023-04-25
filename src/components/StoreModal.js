import React, { useContext } from 'react';
import {
  Button,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { StoreContext } from '../contexts/StoreContext';
import { BUTTON, MODAL } from '../shared/constants'
import { mapStyle } from '../shared/mapStyle';
import { getMapConfig, getPrincipalName } from '../shared/utils';

const StoreModal = ({ closeModal, isModalVisible, storeData }) => {
  const {
    address: {
      coordinate,
      direction,
    },
    id,
    name,
    schedule: {
      end,
      from,
    },
    tasks,
  } = storeData;

  const { addFavoriteTask } = useContext(StoreContext);

  const principalName = getPrincipalName(name);
  const config = getMapConfig(principalName, coordinate);
  const url = Platform.select(config);

  const handleRedirect = () => Linking.openURL(url);
  const handleTaskPress = (storeId, taskId) => addFavoriteTask(storeId, taskId);

  /*
   * Disabled due to constant 404 errors
   */
  // useEffect(() => {
  //   if (error) {
  //     Alert.alert(
  //       error,
  //       null,
  //       [
  //         {
  //           onPress: resetError,
  //         }
  //       ],
  //     );
  //   }
  // }, [error]);

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modal}>
        <Pressable
          onPress={closeModal}
          style={styles.closeButton}
        >
          <Text
            style={styles.closeButtonText}
          >
            {BUTTON.CLOSE}
          </Text>
        </Pressable>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>{name}</Text>
          <View style={styles.tasks}>
            <Text style={styles.taskTitle}>{MODAL.TASKS}</Text>
            {tasks.map(task => (
              <View key={task.id}>
                <Pressable onPress={() => handleTaskPress(id, task.id)}>
                  <Text>{task.description}</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <View style={styles.schedule}>
            <Text>{MODAL.SCHEDULE}:</Text>
            <Text>{from}-{end}</Text>
          </View>
          <View>
            <Text>{MODAL.ADDRESS}:</Text>
            <Text>{direction}</Text>
          </View>
          <MapView
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: 41.3995345,
              longitude: 2.1909796,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
            mapType="standard"
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
          >
            <Marker
              key={id}
              coordinate={{
                latitude: coordinate.lat,
                longitude: coordinate.lng,
              }}
            ></Marker>
          </MapView>
          <Button
            onPress={() => handleRedirect(coordinate)}
            title={BUTTON.MAPS_REDIRECT}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    padding: 20,
  },
  mapStyle: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: "100%",
    padding: 10,
  },
  modalBody: {
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  schedule: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  tasks: {
    marginVertical: 20,
  },
});

export default StoreModal;
