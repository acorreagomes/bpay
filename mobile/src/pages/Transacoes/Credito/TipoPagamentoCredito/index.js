import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
import Background from '~/components/Background';
import api from '~/services/api';
import Funcoes from '~/utils/Funcoes';
import ListaTiposPagamentoCredito from '~/components/TiposPagamentoCredito';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Pergunta from '~/components/Pergunta';

export default function TipoPagamentoCredito({ navigation }) {
  const data = navigation.getParam('data');
  const tipoPagamento = navigation.getParam('tipoPagamento');
  const tipoOperacaoCartao = navigation.getParam('tipoOperacaoCartao');
  const valorTransacao = navigation.getParam('valorTransacao');
  const dadosEvento = navigation.getParam('dadosEvento');

  const [mensagemLoading, setMensagemLoading] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoPagamentoSelecionado, setTipoPagamentoSelecionado] = useState('');
  const [descricaoSelecionada, setDescricaoSelecionada] = useState('');
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');

  const ListaTiposPagamento = [
    {
      id: 1,
      descricao: 'A VISTA',
      detalhes: `1 x de R$ ${valorTransacao.toFixed(2)}`,
    },
  ];

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  function handleModalPergunta(aQuestionMessage) {
    setQuestionMessage(aQuestionMessage);
    setPerguntaModalVisible(true);
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
        // endereco_mac: DeviceInfo.getUniqueId(),
        valor_transacao: valorTransacao,
        forma_pagamento: tipoPagamento,
        tipo_operacao_cartao: tipoOperacaoCartao,
        tipo_transacao: 'CREDITO',
        tipo_operacao_credito: tipoPagamentoSelecionado,
        descricao_pagamento: descricaoSelecionada,
      });
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        showMessage('Recarga efetuada com Sucesso!');
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

  function handleTipoPagamento(item) {
    if (item.id === 1) {
      setTipoPagamentoSelecionado('VISTA');
    } else {
      setTipoPagamentoSelecionado('PRAZO');
    }
    setDescricaoSelecionada(item.descricao);
    handleModalPergunta(
      `Forma de Pagamento \n\n ${item.descricao}\n\n Confirma ?`
    );
  }

  useEffect(() => {
    function calculaParcelas() {
      setMensagemLoading('Analisando...');
      setLoading(true);
      // eslint-disable-next-line no-plusplus
      for (let i = 2; i <= dadosEvento.qtde_max_parcelas; i++) {
        const valorParcelas = valorTransacao / i;
        const valorJuros =
          (dadosEvento.percentual_juros_parcelamento * valorParcelas) / 100;
        const valorParcelaJuros = valorParcelas + valorJuros;
        ListaTiposPagamento.push({
          id: i,
          descricao: `${i} x R$ ${valorParcelaJuros.toFixed(2)}`,
          detalhes: `(Parcela R$ ${valorParcelas.toFixed(
            2
          )}) + (Taxa Cartão R$ ${valorJuros.toFixed(2)})`,
        });
      }
      setLoading(false);
    }
    calculaParcelas();
  });

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Container>
            <List
              data={ListaTiposPagamento}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <ListaTiposPagamentoCredito
                  onCancel={() => handleTipoPagamento(item)}
                  data={item}
                />
              )}
            />
          </Container>
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
      <Loading loading={loading} message={mensagemLoading} />
    </Background>
  );
}

TipoPagamentoCredito.navigationOptions = ({ navigation }) => ({
  title: 'Parcelamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TransacoesCreditoValorPagamento');
      }}
    >
      <Icon name="arrow-back" size={30} color={Colors.COLORS.WHITE} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  controlHidden: {
    display: 'none',
  },
  inputTextCNPJ: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    borderColor: Colors.COLORS.GRAY,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    width: '80%',
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
  textTitle: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  TextButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextMessage: {
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    margin: 10,
    borderRadius: 10,
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  linhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.GRAY,
    width: '95%',
    margin: 10,
  },
  spinnerTextStyle: {
    color: Colors.COLORS.BLACK,
  },
  buttonClose: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_ERROR,
  },
  buttonProcurar: {
    flex: 1,
    marginVertical: 3,
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
    alignItems: 'center',
  },
  buttonConcluir: {
    flex: 1,
    margin: 8,
    height: 45,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
  },
  ImageMessage: {
    alignSelf: 'center',
    height: 210,
    width: 210,
  },
});
