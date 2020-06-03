import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import RelatoriosComponente from '~/components/Relatorios';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';
import Loading from '~/components/Loading';

export default function Relatorios({ navigation }) {
  const id_evento = navigation.getParam('id_evento');
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const [mensagemLoading, setMensagemLoading] = useState('');
  const [totalizadores, setTotalizadores] = useState({});

  useEffect(() => {
    async function RelatorioCaixaEvento() {
      try {
        setMensagemLoading('Calculando...');
        setLoadingVisible(true);
        const response = await api.get(`/eventos/${id_evento}/relatorio`);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setTotalizadores(response.data);
        }
      } catch (error) {
        alert(error);
      }
      setLoadingVisible(false);
    }
    RelatorioCaixaEvento();
  }, [id_evento]);

  return (
    <Background>
      <View style={styles.ContainerValores}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textTitle}>RECARGAS</Text>
          <View style={styles.linhaSeparacao} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <View>
              <Text style={styles.TextTitulo}>Crédito</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.TotalRecargasCredito).toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitulo}>Débito</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.TotalRecargasDebito).toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitulo}>Dinheiro</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.TotalRecargasDinheiro).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ContainerValores}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textTitle}>TOTALIZADORES</Text>
          <View style={styles.linhaSeparacao} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <View>
              <Text style={styles.TextTitulo}>Recargas</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.TotalRecargas).toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitulo}>Vendas</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.TotalVendas).toFixed(2)}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTitulo}>Saldo</Text>
              <Text style={styles.TextValores}>
                {Number(totalizadores.SaldoRestante).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ContainerSetores}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textTitle}>VENDAS POR SETOR</Text>
          <View style={styles.linhaSeparacao} />
          <Container>
            <List
              data={totalizadores.TotalVendaSetores}
              keyExtractor={item => String(item.id_setor)}
              renderItem={({ item }) => <RelatoriosComponente data={item} />}
            />
          </Container>
        </View>
      </View>
      <Loading loading={isLoadingVisible} message={mensagemLoading} />
    </Background>
  );
}

Relatorios.navigationOptions = ({ navigation }) => ({
  title: 'Relatório Fluxo de Caixa',
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
    <TouchableOpacity
      onPress={() => {
        // RelatorioCaixaEvento();
      }}
    >
      <Icon name="refresh" size={30} color={Colors.COLORS.WHITE} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
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
  TextTitulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
  TextValores: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 10,
    textAlign: 'center',
  },
  ContainerValores: {
    height: 160,
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    margin: 10,
    borderRadius: 10,
  },
  ContainerSetores: {
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
