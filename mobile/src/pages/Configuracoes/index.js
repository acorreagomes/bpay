import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Colors from '~/constants/Colors';

export default function Configuracoes({ navigation }) {
  return <Background />;
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
