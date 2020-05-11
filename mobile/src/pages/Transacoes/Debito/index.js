import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import Background from '~/components/Background';
import api from '~/services/api';
import Funcoes from '~/utils/Funcoes';
import Colors from '~/constants/Colors';
import Imagens from '~/constants/Images';

export default function TransacoesDebito({ navigation }) {
  const data = navigation.getParam('data');
  const dadosEvento = navigation.getParam('dadosEvento');
  const [valorTransacao, setValorTransacao] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [isModalDialogVisible, setIsModalDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');

  function handleModalPergunta(aQuestionMessage) {
    if (!valorTransacao || valorTransacao <= 0) {
      showMessage('Valor Inválido', 'error');
    } else if (valorTransacao > data.cartao.saldo) {
      showMessage('Saldo Insuficiente!', 'error');
    } else {
      setQuestionMessage(aQuestionMessage);
      setPerguntaModalVisible(true);
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      setLoading(true);
      ExecutaLancamento();
    }
    setPerguntaModalVisible(false);
  }

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setIsModalDialogVisible(true);
  }

  function handleModal() {
    if (!dialogType) {
      navigation.navigate('Principal');
    } else {
      setIsModalDialogVisible(false);
    }
  }

  async function ExecutaLancamento() {
    try {
      const response = await api.post('/transacoes', {
        id_evento: dadosEvento.id_evento,
        id_setor: dadosEvento.id_setor,
        id_chip: data.cartao.id_chip,
        id_terminal: 1,
        numero_cartao: Funcoes.CalculatedCardNumber(
          data.cartao.id_chip,
          dadosEvento.id_evento
        ),
        endereco_mac: DeviceInfo.getUniqueId(),
        valor_transacao: valorTransacao,
        forma_pagamento: 'D',
        tipo_operacao_cartao: 'D',
        tipo_transacao: 'D',
      });
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        showMessage('Valor Debitado com Sucesso!');
      }
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: 'flex-start', margin: 10 }}>
        <Text style={styles.TextQualValor}>Valor do Débito</Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 30,
          }}
        >
          <NumericInput
            type="decimal"
            decimalPlaces={2}
            value={valorTransacao}
            onUpdate={setValorTransacao}
            placeholder="0,00"
            placeholderTextColor={Colors.COLORS.WHITE}
            keyboardType="phone-pad"
            returnKeyType="send"
            style={styles.TextValor}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            height: 60,
            marginHorizontal: 30,
          }}
        >
          <TouchableOpacity
            style={styles.ButtonContinuar}
            onPress={() =>
              handleModalPergunta(
                `Débito de R$ ${Number(valorTransacao).toFixed(
                  2
                )}\n\n Confirma ? `
              )
            }
          >
            <Text style={styles.TextButtonModal}>Confirma</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View loading={loading} style={styles.Container}>
        <Spinner
          visible={loading}
          textContent="Lançando Débito..."
          overlayColor="rgba(255,255,255,0.9)"
          textStyle={styles.SpinnerTextStyle}
          color={Colors.COLORS.BLACK}
        />
      </View>

      <View style={styles.Container}>
        <Modal
          isVisible={isModalDialogVisible}
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
              source={dialogType ? Imagens.SAD : Imagens.HAPPY}
            />
            <Text style={styles.TextMessage}>{dialogMessage}</Text>

            <TouchableOpacity
              style={{
                margin: 10,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: dialogType
                  ? Colors.COLORS.BUTTON_ERROR
                  : Colors.COLORS.BUTTON_SUCESS,
              }}
              onPress={() => handleModal()}
            >
              <Text style={styles.TextButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <View style={styles.Container}>
        <Modal
          isVisible={isPerguntaModalVisible}
          backdropOpacity={0.9}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={styles.ContainerModal}>
            <Image style={styles.ImageMessage} source={Imagens.THINK} />
            <Text style={styles.TextMessage}>{questionMessage}</Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={() => handleModalResposta(false)}
              >
                <Text style={styles.TextButton}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonConfirmar}
                onPress={() => handleModalResposta(true)}
              >
                <Text style={styles.TextButton}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Background>
  );
}

TransacoesDebito.navigationOptions = ({ navigation }) => ({
  title: 'Informe o Valor',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Principal');
      }}
    >
      <Icon name="arrow-back" size={30} color={Colors.COLORS.WHITE} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  linhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.GRAY,
    width: '95%',
  },
  TextQualValor: {
    color: Colors.COLORS.WHITE,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  TextValor: {
    flex: 1,
    margin: 8,
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    borderColor: Colors.COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  TextButtonModal: {
    color: Colors.COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ButtonContinuar: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
    height: 45,
    justifyContent: 'center',
  },
  buttonCancelar: {
    flex: 1,
    margin: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_ERROR,
  },
  buttonConfirmar: {
    flex: 1,
    margin: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ContainerModal: {
    flex: 1,
    justifyContent: 'center',
  },
  TextMessage: {
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  ImageMessage: {
    alignSelf: 'center',
    height: 210,
    width: 210,
  },
});
