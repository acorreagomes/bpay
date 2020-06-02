import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Colors from '~/constants/Colors';

export default function TransacoesCreditoTipoPagamento({ navigation }) {
  const data = navigation.getParam('data');
  const dadosEvento = navigation.getParam('dadosEvento');

  function handleModalTipoPagamento(aTipoPagamento, aTipoOperacaoCartao) {
    navigation.navigate('TransacoesCreditoValorPagamento', {
      data,
      tipoPagamento: aTipoPagamento,
      tipoOperacaoCartao: aTipoOperacaoCartao,
      dadosEvento,
    });
  }

  return (
    <Background>
      <View style={{ flex: 1, justifyContent: 'flex-start', margin: 10 }}>
        <View style={styles.ContainerBotoesFormaPgto}>
          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => handleModalTipoPagamento('DINHEIRO', 'DEBITO')}
          >
            <View style={styles.ContainerItensButtons}>
              <Icon name="receipt" size={30} color={Colors.COLORS.WHITE} />
              <Text style={styles.TextImagemTipoPagamento}>Dinheiro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => handleModalTipoPagamento('CREDITO', 'CREDITO')}
          >
            <View style={styles.ContainerItensButtons}>
              <Icon name="payment" size={30} color={Colors.COLORS.WHITE} />
              <Text style={styles.TextImagemTipoPagamento}>Crédito</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => handleModalTipoPagamento('CREDITO', 'DEBITO')}
          >
            <View style={styles.ContainerItensButtons}>
              <Icon name="payment" size={30} color={Colors.COLORS.WHITE} />
              <Text style={styles.TextImagemTipoPagamento}>Débito</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

TransacoesCreditoTipoPagamento.navigationOptions = ({ navigation }) => ({
  title: 'Tipo de Pagamento',
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
  TextImagemTipoPagamento: {
    color: Colors.COLORS.WHITE,
    marginLeft: 10,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Buttons: {
    flex: 1,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#696969',
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  ContainerItensButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContainerBotoesFormaPgto: {
    height: '45%',
    margin: 10,
    justifyContent: 'center',
  },
  LinhaSeparacao: {
    borderWidth: 0.5,
    borderColor: Colors.COLORS.WHITE,
    width: '90%',
    marginTop: 55,
    alignSelf: 'center',
  },
});
