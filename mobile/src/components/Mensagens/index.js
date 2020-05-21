import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import Imagens from '~/constants/Images';
import Colors from '~/constants/Colors';

export default function Mensagens({ type, visible, message }) {

  function handleVisible(isVisible) {
    visible = false;
  }

  return (
    <View style={styles.Container}>
      <Modal
        isVisible={visible}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={styles.ContainerModal}>
          <Image
            style={styles.ImageMessage}
            source={type === 'error' ? Imagens.SAD : Imagens.HAPPY}
          />
          <Text style={styles.TextMessage}>{message}</Text>

          <TouchableOpacity
            style={{
              margin: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor:
                type === 'error'
                  ? Colors.COLORS.BUTTON_ERROR
                  : Colors.COLORS.BUTTON_SUCESS,
            }}
            onPress={() => handleVisible(false)}
          >
            <Text style={styles.TextButton}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ContainerModal: {
    flex: 1,
    justifyContent: 'center',
  },
  textMessage: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageMessage: {
    alignSelf: 'center',
    height: 210,
    width: 210,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
