import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Funcoes from '~/utils/Funcoes';
import api from '~/services/api';
import Background from '~/components/Background';
import Colors from '~/constants/Colors';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Pergunta from '~/components/Pergunta';

export default function DadosEvento({ navigation }) {
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const [dadosEvento, setDadosEvento] = useState([]);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [isCNPJModalVisible, setCNPJModalVisible] = useState(false);
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');
  const [mensagemLoading, setMensagemLoading] = useState('');
  const [CNPJ, setCNPJ] = useState('');

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  function handleModalPergunta(aQuestionMessage) {
    setQuestionMessage(aQuestionMessage);
    setPerguntaModalVisible(true);
  }

  async function handleRemoverEvento() {
    try {
      await AsyncStorage.multiRemove([
        'id_evento',
        'nome_evento',
        'data_inicio',
        'hora_inicio',
        'data_termino',
        'hora_termino',
        'valor_min_parcelamento',
        'percentual_juros_parcelamento',
        'qtde_max_parcelas',
        'id_setor',
        'nome_setor',
      ]);
      setDadosEvento([]);
    } catch (error) {
      // /
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      handleRemoverEvento();
    }
    setPerguntaModalVisible(false);
  }

  async function PesquisaEventos() {
    if (!CNPJ) {
      showMessage('Informe o CNPJ', 'error');
    } else {
      try {
        setMensagemLoading('Pesquisando por Eventos...');
        setLoadingVisible(true);
        const response = await api.get(`/eventos/eventosprodutor?cnpj=${CNPJ}`);
        if (response.data.error) {
          showMessage(response.data.error, 'error');
        } else {
          setCNPJ('');
          setLoadingVisible(false);
          setCNPJModalVisible(false);
          navigation.navigate('SelecionaEvento', { data: response.data });
        }
      } catch (error) {
        showMessage(error, 'error');
      }
      setLoadingVisible(false);
    }
  }

  function handleCancelar() {
    setCNPJ('');
    setCNPJModalVisible(false);
  }

  useEffect(() => {
    let mounted = true;
    async function recuperaDadosEventoStorage() {
      try {
        const dados = await AsyncStorage.multiGet([
          'id_evento',
          'nome_evento',
          'data_inicio',
          'hora_inicio',
          'data_termino',
          'hora_termino',
          'valor_min_parcelamento',
          'percentual_juros_parcelamento',
          'qtde_max_parcelas',
          'id_setor',
          'nome_setor',
        ]);
        setDadosEvento(dados);
      } catch (error) {
        // /
      }
    }
    if (mounted) {
      recuperaDadosEventoStorage();
      mounted = false;
    }
  });

  return (
    <Background>
      <View style={styles.Container}>
        <Text style={styles.Titulo}>Evento</Text>
        <View style={styles.linhaSeparacao} />

        {dadosEvento && dadosEvento.length && dadosEvento[0][1] !== null ? (
          <View>
            <Text style={styles.TextTitulo}>Nome do Evento</Text>
            <Text style={styles.TextValores}>{dadosEvento[1][1]}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 20 }}>
                <Text style={styles.TextTitulo}>Início</Text>
                <Text style={styles.TextValores}>
                  {Funcoes.strToDate(dadosEvento[2][1])} ás{' '}
                  {dadosEvento[3][1].substr(0, 5)}
                </Text>
              </View>
              <View>
                <Text style={styles.TextTituloTermino}>Término</Text>
                <Text style={styles.TextValoresTermino}>
                  {Funcoes.strToDate(dadosEvento[4][1])} ás{' '}
                  {dadosEvento[5][1].substr(0, 5)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
            <Text style={styles.TextNadaEncontrado}>
              Nenhum evento selecionado
            </Text>
          )}

        <View style={styles.linhaSeparacao} />
        <Text style={styles.Titulo}>Setor</Text>
        <View style={styles.linhaSeparacao} />

        {dadosEvento && dadosEvento.length && dadosEvento[0][1] !== null ? (
          <View>
            <Text style={styles.TextTitulo}>Nome do Setor</Text>
            <Text style={styles.TextValoresSetor}>{dadosEvento[10][1]}</Text>
          </View>
        ) : (
            <Text style={styles.TextNadaEncontrado}>
              Nenhum setor selecionado
            </Text>
          )}

        <View style={styles.linhaSeparacao} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={
              dadosEvento && dadosEvento.length && dadosEvento[0][1] !== null
                ? styles.buttonClose
                : styles.Hidde
            }
            onPress={() => {
              handleModalPergunta('Confirma a remoção do evento ?');
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.TextButtons}>Remover Evento</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProcurar}
            onPress={() => setCNPJModalVisible(true)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.TextButtons}>Procurar Eventos</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ContainerModais}>
        <Modal
          isVisible={isCNPJModalVisible}
          backdropOpacity={0.9}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <View style={styles.ContainerModal}>
            <Text style={styles.TextCNPJ}>Informe o CNPJ</Text>
            <TextInput
              value={CNPJ}
              onChangeText={setCNPJ}
              placeholder="00.000.000/0000-00"
              placeholderTextColor="#696969"
              style={styles.inputTextCNPJ}
            />

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.buttonCancelar}
                onPress={() => handleCancelar()}
              >
                <Text style={styles.TextButton}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonConfirmar}
                onPress={() => PesquisaEventos()}
              >
                <Text style={styles.TextButton}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
        close={() => setisDialogVisible(false)}
      />
      <Loading loading={isLoadingVisible} message={mensagemLoading} />
    </Background>
  );
}

DadosEvento.navigationOptions = ({ navigation }) => ({
  title: 'Dados do Evento',
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
  Hidde: {
    display: 'none',
  },
  ContainerModais: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Container: {
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  inputTextCNPJ: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    borderColor: Colors.COLORS.GRAY,
    color: Colors.COLORS.WHITE,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
    marginHorizontal: 10,
  },
  ButtonProcurar: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
  },
  buttonClose: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_ERROR,
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
  TextButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextButtons: {
    color: Colors.COLORS.WHITE,
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  TextCNPJ: {
    color: Colors.COLORS.WHITE,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  TextButtonModal: {
    color: Colors.COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  Titulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
  },
  TextTitulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
  TextTituloTermino: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
  },
  TextNadaEncontrado: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
  },
  TextValores: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
  TextValoresSetor: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
  TextValoresTermino: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
  },
  TextMessage: {
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  linhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.GRAY,
    width: '95%',
    alignSelf: 'center',
  },
  ImageMessage: {
    alignSelf: 'center',
    height: 210,
    width: 210,
  },
});
