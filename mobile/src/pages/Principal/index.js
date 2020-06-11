import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import AnimatedLoader from 'react-native-animated-loader';
import api from '~/services/api';
import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import Funcoes from '~/utils/Funcoes';
import Imagens from '~/constants/Images';
import Colors from '~/constants/Colors';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';

export default function Principal({ navigation }) {
  const usuarioLogado = useSelector(state => state.auth.userNameLogged);
  const perfilUsuario = useSelector(state => state.auth.profile);
  const dispatch = useDispatch();
  const [isNFCVisible, setNFCVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagemLoading, setmensagemLoading] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('');
  const [isModalDialogVisible, setIsModalDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [dadosEvento, setDadosEvento] = useState({});

  function handleLoggout() {
    dispatch(signOut());
  }

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setIsModalDialogVisible(true);
  }

  function handleLoading(loadingVisible, aMensageLoading) {
    setmensagemLoading(aMensageLoading);
    setLoading(loadingVisible);
  }

  async function startReading() {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }

  async function stopReading() {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  function handleNFCVisible(isVisible, aTipoTransacao) {
    if (!dadosEvento.id_evento) {
      showMessage('Selecione seu evento!', 'error');
      setNFCVisible(false);
    } else {
      setNFCVisible(isVisible);
      if (isVisible) {
        setTipoTransacao(aTipoTransacao);
        startReading();
      } else {
        stopReading();
        handleLoading(false, '');
      }
    }
  }

  async function SituacaoCartao(numero_chip) {
    try {
      const response = await api.get(
        `/cartoes/situacao?numero=${Funcoes.CalculatedCardNumber(
          numero_chip,
          dadosEvento.id_evento
        )}`
      );
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else if (tipoTransacao === 'DEBITO') {
        navigation.navigate('TransacoesDebito', {
          data: response.data,
          dadosEvento,
        });
      } else if (tipoTransacao === 'CREDITO') {
        navigation.navigate('TransacoesCreditoTipoPagamento', {
          data: response.data,
          dadosEvento,
        });
      } else if (tipoTransacao === 'CONSULTA_CARTAO') {
        navigation.navigate('ConsultaCartao', {
          numero_chip,
          id_evento: dadosEvento.id_evento,
        });
      }
    } catch (error) {
      showMessage(error, 'error');
    }
    handleNFCVisible(false, '');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleNumeroChip(tag) {
    handleLoading(true, 'Consultando Cartão...');
    SituacaoCartao(tag.id);
  }

  useEffect(() => {
    async function setIdTerminal(idTerminal) {
      try {
        await AsyncStorage.setItem('id_terminal', idTerminal.toString());
      } catch (error) {
        // alert(error);
      }
    }
    async function CadastraTerminal() {
      try {
        const response = await api.post('/terminais', {
          endereco_mac: DeviceInfo.getUniqueId(),
          fabricante: DeviceInfo.getBrand().toUpperCase(),
          modelo: (await DeviceInfo.getDeviceName()).toString(),
        });

        if (response.data.error) {
          showMessage(response.data.error, 'error');
        } else {
          setIdTerminal(response.data.id);
        }
      } catch (error) {
        // alert(error);
      }
    }
    async function getEventoSelecionado() {
      try {
        const dados = await AsyncStorage.multiGet([
          'id_evento',
          'id_setor',
          'id_terminal',
          'valor_min_parcelamento',
          'percentual_juros_parcelamento',
          'qtde_max_parcelas',
        ]);
        setDadosEvento({
          id_evento: dados[0][1],
          id_setor: dados[1][1],
          id_terminal: dados[2][1],
          valor_min_parcelamento: dados[3][1],
          percentual_juros_parcelamento: dados[4][1],
          qtde_max_parcelas: dados[5][1],
        });
        if (!dados[2][1]) {
          CadastraTerminal();
        }
      } catch (error) {
        // alert(error);
      }
    }
    getEventoSelecionado();
  }, [dadosEvento.id_terminal]);

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      handleNumeroChip(tag);
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }, [handleNumeroChip]);

  return (
    <Background>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.TextPergunta}>
          {Funcoes.Saudacao()}, {Funcoes.copySplitedStr(usuarioLogado, 1)}.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
        >
          <View
            style={{ display: perfilUsuario.acessa_recargas ? 'flex' : 'none' }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => handleNFCVisible(true, 'CREDITO')}
            >
              <Icon name="store" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Recarregar</Text>
          </View>
          <View
            style={{ display: perfilUsuario.acessa_vendas ? 'flex' : 'none' }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => handleNFCVisible(true, 'DEBITO')}
            >
              <Icon name="payment" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Debitar</Text>
          </View>
          <View
            style={{
              display: perfilUsuario.acessa_consulta_cartao ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => handleNFCVisible(true, 'CONSULTA_CARTAO')}
            >
              <Icon name="search" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Consultar</Text>
          </View>
          <View
            style={{
              display: perfilUsuario.acessa_dados_evento ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => {
                navigation.navigate('DadosEvento');
              }}
            >
              <Icon name="event" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Evento</Text>
          </View>
          <View
            style={{
              display: perfilUsuario.acessa_relatorios ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => {
                navigation.navigate('Relatorios', {
                  id_evento: dadosEvento.id_evento,
                });
              }}
            >
              <Icon name="print" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Relatórios</Text>
          </View>
          <View
            style={{
              display: perfilUsuario.acessa_configuracoes ? 'flex' : 'none',
            }}
          >
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => navigation.navigate('Configuracoes')}
            >
              <Icon name="settings" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Configurações</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.ButtonCredito}
              onPress={() => handleLoggout()}
            >
              <Icon name="close" size={30} color={Colors.COLORS.WHITE} />
            </TouchableOpacity>
            <Text style={styles.TextButtons}>Sair</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isNFCVisible}
          backdropOpacity={0.0}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.TextAproximeCartao}>Aproxime o Cartão</Text>
            <View loading={isNFCVisible} style={styles.ContainerNFC}>
              <AnimatedLoader
                visible={isNFCVisible}
                overlayColor="rgba(0,0,0,0.90)"
                source={Imagens.LOADER_NFC}
                animationStyle={styles.Lottie}
                speed={1.5}
              />
            </View>

            <TouchableOpacity
              style={styles.ButtonCancelarNFC}
              onPress={() => handleNFCVisible(false, '')}
            >
              <Text style={styles.TextButtonModal}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Mensagens
        type={dialogType}
        visible={isModalDialogVisible}
        message={dialogMessage}
        close={() => setIsModalDialogVisible(false)}
      />
      <Loading loading={loading} message={mensagemLoading} />
    </Background>
  );
}

Principal.navigationOptions = ({ navigation }) => ({
  title: '',
});

const styles = StyleSheet.create({
  Lottie: {
    width: 250,
    height: 250,
  },
  TextPergunta: {
    color: Colors.COLORS.INPUT,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  TextButtons: {
    color: Colors.COLORS.GRAY,
    fontSize: 13,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  TextButtonModal: {
    color: Colors.COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextAproximeCartao: {
    color: Colors.COLORS.WHITE,
    alignSelf: 'center',
    marginBottom: 20,
    fontSize: 35,
    fontWeight: 'bold',
  },
  ButtonCredito: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 20,
    height: 50,
    width: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COLORS.BUTTON_BACKGROUND,
  },
  ButtonDebito: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 20,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Colors.COLORS.BUTTON_BACKGROUND,
  },
  ButtonCancelarNFC: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_ERROR,
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
  ContainerNFC: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    marginTop: 10,
    marginBottom: 30,
  },
  LinhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.GRAY,
    width: '95%',
  },
  TextMessage: {
    color: Colors.COLORS.WHITE,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  TextButton: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
  ImageMessage: {
    alignSelf: 'center',
    height: 210,
    width: 210,
  },
});
