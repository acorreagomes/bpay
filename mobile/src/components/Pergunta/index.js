import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Colors from '~/constants/Colors';
import Imagens from '~/constants/Images';

export default function Mensagens({ visible, message, close, confirm }) {
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
            source={Imagens.THINK}
          />
          <Text
            style={{
              color: Colors.COLORS.WHITE,
              textAlign: 'center',
              marginTop: 50,
              marginBottom: 20,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {message}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                margin: 10,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: Colors.COLORS.BUTTON_ERROR,
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
                Não
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                margin: 10,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: Colors.COLORS.BUTTON_SUCESS,
              }}
              onPress={confirm}
            >
              <Text
                style={{
                  color: Colors.COLORS.WHITE,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Sim
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

Mensagens.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

Mensagens.defaultProps = {
  visible: false,
};
