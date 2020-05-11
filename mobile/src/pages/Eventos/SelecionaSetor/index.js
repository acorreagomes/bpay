import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import Background from '~/components/Background';
import Setores from '~/components/Setores';
import { Container, List } from './styles';
import Colors from '~/constants/Colors';

export default function SelecionaSetor({ navigation }) {
  const data = navigation.getParam('data');
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const [mensagemLoading, setMensagemLoading] = useState('');
  const [setores, setSetores] = useState([]);

  function handleSetorSelecionado(item) {
    navigation.navigate('ConfirmaEventoSetor', {
      evento: data,
      setor: item,
    });
  }

  useEffect(() => {
    async function PesquisaSetores() {
      try {
        setMensagemLoading('Pesquisando Setores...');
        setLoadingVisible(true);
        const response = await api.get(`/setores/eventos/${data.id}`);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setSetores(response.data);
        }
      } catch (error) {
        alert(error);
      }
      setLoadingVisible(false);
    }
    PesquisaSetores();
  }, [data.id]);

  return (
    <Background>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Container>
            <List
              data={setores}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Setores
                  onCancel={() => handleSetorSelecionado(item)}
                  data={item}
                />
              )}
            />
          </Container>
        </View>
      </View>

      <View style={styles.containerLoading}>
        <Spinner
          visible={isLoadingVisible}
          textContent={mensagemLoading}
          overlayColor="rgba(255,255,255,0.9)"
          textStyle={styles.spinnerTextStyle}
          color={Colors.COLORS.BLACK}
        />
      </View>
    </Background>
  );
}

SelecionaSetor.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Setor',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelecionaEvento');
      }}
    >
      <Icon name="arrow-back" size={30} color={Colors.COLORS.WHITE} />
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
