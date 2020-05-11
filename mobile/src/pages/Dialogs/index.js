import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import Background from '~/components/Background';
import Sad from '~/assets/sad.png';
import Happy from '~/assets/happy.png';

export default function Dialogs({ navigation }) {
  const LPageReturn = navigation.getParam('aPageReturn');
  const LMensagem = navigation.getParam('aMessage');
  const LDialogType = navigation.getParam('aDialogType');

  return (
    <Background>
      <View style={{ flex: 1 }}>
        <Modal
          isVisible
          backdropOpacity={0.9}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.container}>
            <Image
              style={styles.imageMessage}
              source={LDialogType ? Sad : Happy}
            />
            <Text style={styles.textMessage}>{LMensagem}</Text>

            <TouchableOpacity
              style={{
                margin: 10,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: LDialogType ? '#9D2235' : '#006C5B',
              }}
              onPress={() => navigation.navigate(LPageReturn)}
            >
              <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  textMessage: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textButton: {
    color: 'white',
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
