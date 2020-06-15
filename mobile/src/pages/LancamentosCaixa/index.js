import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import Extrato from '~/components/Extrato';
import DadosCartao from '~/components/Cartao';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';
import Estilos from '~/constants/Estilos';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Funcoes from '~/utils/Funcoes';

export default function LancamentosCaixa({ navigation }) {
  const id_evento = navigation.getParam('id_evento');

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [renderizado, setRenderizado] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogVisible, setisDialogVisible] = useState(false);

  const perfilUsuario = useSelector(state => state.auth.profile);

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  async function cancelamento(id) {
    setLoading(true);
    try {
      const response = await api.delete(`/transacoes/${id}/cancelar`);
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        setRenderizado(false);
        Toast.show(
          'Cancelado com Sucesso!',
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

  useEffect(() => {
    // async function ConsultaCartao() {
    //   try {
    //     setLoading(true);
    //     const response = await api.get(
    //       `/cartoes/situacao?numero=${Funcoes.CalculatedCardNumber(
    //         numero_chip,
    //         id_evento
    //       )}`
    //     );
    //     if (response.data.error) {
    //       alert(response.data.error);
    //     } else {
    //       setData(response.data);
    //       setRenderizado(true);
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    //   setLoading(false);
    // }
    // ConsultaCartao();
  }, [id_evento, renderizado]);

  return (
    <Background>
      {renderizado ? (
        <>
          <View style={styles.Container}>
            <Text style={styles.Titulo}>Dados do Cartão</Text>
            <View style={styles.linhaSeparacao} />
            <View style={styles.ContainerMain}>
              <View style={styles.linhaSeparacao} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <DadosCartao data={data} />
                  <View style={styles.linhaSeparacao} />
                  <Text style={styles.Titulo}>Extrato do Cartão</Text>
                  <View style={styles.linhaSeparacao} />
                  {data.extrato.length === 0 ? (
                    <View style={styles.ContainerSemMovimentacoes}>
                      <Text style={styles.TextoSemMovimentacao}>
                        === Cartão sem Movimentação ===
                      </Text>
                    </View>
                  ) : (
                      <Container>
                        <List
                          data={data.extrato}
                          keyExtractor={item => String(item.id)}
                          renderItem={({ item }) => (
                            <Extrato
                              data={item}
                              profile={perfilUsuario}
                              cancel={() => cancelamento(item.id)}
                            />
                          )}
                        />
                      </Container>
                    )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ContainerSaldo2}>
            <View style={styles.ContainerSaldo}>
              <Text style={styles.SaldoCartaoTitulo}>Saldo do Cartão</Text>
              <Text
                style={
                  data.cartao.saldo === 0
                    ? styles.SaldoCartaoValorZerado
                    : styles.SaldoCartaoValorPositivo
                }
              >
                R$ {Number(data.cartao.saldo).toFixed(2)}
              </Text>
            </View>
          </View>
        </>
      ) : (
          <View />
        )}
      <Mensagens
        type={dialogType}
        visible={isDialogVisible}
        message={dialogMessage}
        close={() => setisDialogVisible(false)}
      />
      <Loading loading={loading} message="Consultando Cartão..." />
    </Background>
  );
}

LancamentosCaixa.navigationOptions = ({ navigation }) => ({
  title: 'Lançamentos Caixa',
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
  Container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  ContainerMain: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  Titulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  SaldoCartaoTitulo: {
    color: Colors.COLORS.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  SaldoCartaoValorZerado: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
  SaldoCartaoValorPositivo: {
    color: '#3CB371',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
  },
  TextoSemMovimentacao: {
    color: Colors.COLORS.GRAY,
    textAlign: 'center',
    fontSize: 18,
  },
  linhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.GRAY,
    width: '95%',
  },
  ContainerSaldo: {
    flex: 1,
    justifyContent: 'center',
    borderColor: Colors.COLORS.GRAY,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  ContainerSaldo2: {
    flexDirection: 'row',
    height: 130,
  },
  ContainerSemMovimentacoes: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
});
