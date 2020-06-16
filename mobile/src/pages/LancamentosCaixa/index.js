import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import ItemsLancamento from '~/components/ItemsLancamento';
import DadosTerminal from '~/components/DadosTerminal';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';
import Estilos from '~/constants/Estilos';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Lancamentos from '~/components/Lancamentos';

export default function LancamentosCaixa({ navigation }) {
  const dadosEvento = navigation.getParam('dadosEvento');

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [renderizado, setRenderizado] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [isLancamentoVisible, setIsLancamentoVisible] = useState(false);

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
    async function ConsultaTerminal() {
      try {
        setLoading(true);
        const response = await api.get(
          `/terminais/lancamentos?id_terminal=${dadosEvento.id_terminal}&id_evento=${dadosEvento.id_evento}`
        );
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
          setRenderizado(true);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    }
    ConsultaTerminal();
  }, [dadosEvento.id_evento, dadosEvento.id_terminal, renderizado]);

  function handleFechaNovoLancamento() {
    setIsLancamentoVisible(false);
    setRenderizado(false);
  }

  // useEffect(() => {
  //   if (constcallScreen === 'true') {
  //     setIsLancamentoVisible(true);
  //   }
  // }, [constcallScreen]);

  return (
    <Background>
      {renderizado ? (
        <>
          <View style={styles.Container}>
            <TouchableOpacity onPress={() => setIsLancamentoVisible(true)}>
              <Text>Clica aqui</Text>
            </TouchableOpacity>

            <Text style={styles.Titulo}>Dados do Terminal</Text>
            <View style={styles.linhaSeparacao} />
            <View style={styles.ContainerMain}>
              <View style={styles.linhaSeparacao} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <DadosTerminal data={data} />
                  <View style={styles.linhaSeparacao} />
                  <Text style={styles.Titulo}>Lançamentos do Terminal</Text>
                  <View style={styles.linhaSeparacao} />
                  {data.lancamentos.length === 0 ? (
                    <View style={styles.ContainerSemMovimentacoes}>
                      <Text style={styles.TextoSemMovimentacao}>
                        === Terminal sem Lançamentos ===
                      </Text>
                    </View>
                  ) : (
                      <Container>
                        <List
                          data={data.lancamentos}
                          keyExtractor={item => String(item.id)}
                          renderItem={({ item }) => (
                            <ItemsLancamento
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
      <Loading loading={loading} message="Consultando Terminal..." />
      <Lancamentos
        visible={isLancamentoVisible}
        dadosEvento={dadosEvento}
        close={() => handleFechaNovoLancamento()}
      />
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
  headerRight: () => (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
        <Icon name="add" size={30} color={Colors.COLORS.WHITE} />
      </TouchableOpacity>
    </>
  ),
});

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    alignItems: 'center',
    marginVertical: 15,
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
