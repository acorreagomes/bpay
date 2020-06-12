import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Imagens from '~/constants/Images';
import Colors from '~/constants/Colors';

export default function Mensagens({ type, visible, message, close }) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}
    >
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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            style={{ alignSelf: 'center', height: 210, width: 210 }}
            source={type === 'error' ? Imagens.SAD : Imagens.HAPPY}
          />
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: 50,
              marginBottom: 20,
              fontSize: 30,
              fontWeight: 'bold',
            }}
          >
            {message}
          </Text>

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
            onPress={close}
          >
            <Text
              style={{
                color: Colors.COLORS.WHITE,
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

Mensagens.propTypes = {
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

Mensagens.defaultProps = {
  visible: false,
};
