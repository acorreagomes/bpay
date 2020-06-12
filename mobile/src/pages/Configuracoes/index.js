import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Colors from '~/constants/Colors';

import LancamentosCaixa from '~/components/LancamentosCaixa';

export default function Configuracoes({ navigation }) {
  const dadosEvento = navigation.getParam('dadosEvento');
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <Background>
      <View>
        <TouchableOpacity onPress={() => setVisibleModal(true)}>
          <Text>Lançar</Text>
        </TouchableOpacity>
      </View>

      <LancamentosCaixa
        visible={visibleModal}
        dadosEvento={dadosEvento}
        close={() => setVisibleModal(false)}
      />
    </Background>
  );
}

Configuracoes.navigationOptions = ({ navigation }) => ({
  title: 'Configurações',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Principal');
      }}
    >
      <Icon name="arrow-back" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  Container: {
    borderWidth: 1,
    borderColor: Colors.COLORS.GRAY,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  ButtonProcurar: {
    flex: 1,
    margin: 10,
    height: 40,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
  },
  Titulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  NenhumDadoEncontrado: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
