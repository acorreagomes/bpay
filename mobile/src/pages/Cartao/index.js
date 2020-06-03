import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Extrato from '~/components/Extrato';
import DadosCartao from '~/components/Cartao';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';

export default function Cartao({ navigation }) {
  const data = navigation.getParam('data');
  const perfilUsuario = useSelector(state => state.auth.profile);
  return (
    <Background>
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
                        <Extrato data={item} profile={perfilUsuario} />
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
    </Background>
  );
}

Cartao.navigationOptions = ({ navigation }) => ({
  title: 'Consulta Cartão',
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
