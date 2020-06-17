import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Eventos from '~/components/Eventos';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';

export default function SelecionaEvento({ navigation }) {
  const data = navigation.getParam('data');

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Container>
            <List
              data={data}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Eventos
                  onCancel={() =>
                    navigation.navigate('SelecionaSetor', { data: item })
                  }
                  data={item}
                />
              )}
            />
          </Container>
        </View>
      </View>
    </Background>
  );
}

SelecionaEvento.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Evento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DadosEvento');
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
