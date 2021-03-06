import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import Background from '~/components/Background';
import api from '~/services/api';
import Funcoes from '~/utils/Funcoes';
import Colors from '~/constants/Colors';
import Estilos from '~/constants/Estilos';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Pergunta from '~/components/Pergunta';

export default function TransacoesCreditoValorPagamento({ navigation }) {
  const data = navigation.getParam('data');
  const tipoPagamento = navigation.getParam('tipoPagamento');
  const tipoOperacaoCartao = navigation.getParam('tipoOperacaoCartao');
  const dadosEvento = navigation.getParam('dadosEvento');

  const [valorTransacao, setValorTransacao] = useState(0);
  const [valorDinheiro, setValorDinheiro] = useState(0);
  const [valorTroco, setValorTroco] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  function handleModalPergunta(aQuestionMessage) {
    if (!valorTransacao || valorTransacao <= 0) {
      showMessage('Valor da Recarga Inválido', 'error');
    } else if (
      valorTransacao >= dadosEvento.valor_min_parcelamento &&
      dadosEvento.valor_min_parcelamento > 0 &&
      tipoPagamento === 'CARTAO' &&
      tipoOperacaoCartao === 'CREDITO'
    ) {
      navigation.navigate('TipoPagamentoCredito', {
        data,
        tipoPagamento,
        tipoOperacaoCartao,
        valorTransacao,
        dadosEvento,
      });
    } else {
      setQuestionMessage(aQuestionMessage);
      setPerguntaModalVisible(true);
    }
  }

  async function ExecutaLancamento() {
    try {
      const response = await api.post('/transacoes', {
        id_evento: dadosEvento.id_evento,
        id_setor: dadosEvento.id_setor,
        id_chip: data.cartao.id_chip,
        id_terminal: dadosEvento.id_terminal,
        numero_cartao: Funcoes.CalculatedCardNumber(
          data.cartao.id_chip,
          dadosEvento.id_evento
        ),
        valor_transacao: valorTransacao,
        forma_pagamento: tipoPagamento,
        tipo_operacao_cartao: tipoOperacaoCartao,
        tipo_transacao: 'CREDITO',
      });
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        navigation.navigate('Principal');
        Toast.show(
          'Recarga efetuada com Sucesso!',
          Toast.SHORT,
          Toast.BOTTOM,
          Estilos.TOAST_STYLE
        );
      }
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      setLoading(true);
      ExecutaLancamento();
    }
    setPerguntaModalVisible(false);
  }

  function handleModal() {
    if (!dialogType) {
      navigation.navigate('Principal');
    } else {
      setisDialogVisible(false);
    }
  }

  useEffect(() => {
    const LValorTroco = valorDinheiro - valorTransacao;
    if (LValorTroco > 0) {
      setValorTroco(valorDinheiro - valorTransacao);
    } else {
      setValorTroco(0);
    }
  }, [valorDinheiro, valorTransacao]);

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: 'flex-start', margin: 5 }}>
        <View style={{ marginHorizontal: 40 }}>
          <Text style={styles.TextQualValor}>Valor da Recarga</Text>
          <View style={{ flexDirection: 'row' }}>
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
        </View>

        <View
          style={{
            marginHorizontal: 40,
            display: tipoPagamento === 'DINHEIRO' ? 'flex' : 'none',
          }}
        >
          <Text style={styles.TextQualValor}>Valor em Dinheiro</Text>
          <View style={{ flexDirection: 'row' }}>
            <NumericInput
              type="decimal"
              decimalPlaces={2}
              value={valorDinheiro}
              onUpdate={setValorDinheiro}
              placeholder="0,00"
              placeholderTextColor={Colors.COLORS.WHITE}
              keyboardType="phone-pad"
              returnKeyType="send"
              style={styles.TextValor}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 40,
            display: tipoPagamento === 'DINHEIRO' ? 'flex' : 'none',
          }}
        >
          <Text style={styles.TextQualValor}>Valor do Troco</Text>
          <View style={{ flexDirection: 'row' }}>
            <NumericInput
              type="decimal"
              decimalPlaces={2}
              value={valorTroco}
              onUpdate={setValorTroco}
              placeholder="0,00"
              placeholderTextColor={Colors.COLORS.GRAY}
              keyboardType="phone-pad"
              returnKeyType="send"
              editable={false}
              style={styles.TextValorTroco}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, height: 60 }}>
          <TouchableOpacity
            style={styles.ButtonContinuar}
            onPress={() =>
              handleModalPergunta(
                `Crédito de R$ ${Number(valorTransacao).toFixed(
                  2
                )}\n\n Confirma ? `
              )
            }
          >
            <Text style={styles.TextButtonModal}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pergunta
        visible={isPerguntaModalVisible}
        message={questionMessage}
        close={() => handleModalResposta(false)}
        confirm={() => handleModalResposta(true)}
      />
      <Mensagens
        type={dialogType}
        visible={isDialogVisible}
        message={dialogMessage}
        close={() => handleModal()}
      />
      <Loading loading={loading} message="Efetuando Recarga..." />
    </Background>
  );
}

TransacoesCreditoValorPagamento.navigationOptions = ({ navigation }) => ({
  title: 'Informe os Valores',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TransacoesCreditoTipoPagamento');
      }}
    >
      <Icon name="arrow-back" size={30} color={Colors.COLORS.WHITE} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  TextQualValor: {
    color: Colors.COLORS.WHITE,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  TextValor: {
    flex: 1,
    margin: 5,
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    borderColor: Colors.COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  TextValorTroco: {
    flex: 1,
    margin: 8,
    color: '#3CB371',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  TextButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  TextButtonModal: {
    color: Colors.COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextTipoPagamento: {
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  TextImagemTipoPagamento: {
    color: Colors.COLORS.WHITE,
    margin: 5,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
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
  ButtonContinuar: {
    flex: 1,
    marginHorizontal: 40,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
    height: 45,
    justifyContent: 'center',
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
  ContainerBotoesFormaPgto: {
    flex: 1,
    justifyContent: 'center',
  },
});
