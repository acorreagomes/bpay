import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Funcoes from '~/utils/Funcoes';
import Background from '~/components/Background';
import Colors from '~/constants/Colors';
import Pergunta from '~/components/Pergunta';

export default function ConfirmaEventoSetor({ navigation }) {
  const evento = navigation.getParam('evento');
  const setor = navigation.getParam('setor');
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [questionMessage, setQuestionMessage] = useState('');

  function handleModalPergunta(aQuestionMessage) {
    setQuestionMessage(aQuestionMessage);
    setPerguntaModalVisible(true);
  }

  async function storeDadosEventoStorage() {
    try {
      await AsyncStorage.multiSet([
        ['id_evento', evento.id.toString()],
        ['nome_evento', evento.nome_evento],
        ['data_inicio', evento.data_inicio],
        ['hora_inicio', evento.hora_inicio],
        ['data_termino', evento.data_termino],
        ['hora_termino', evento.hora_termino],
        ['valor_min_parcelamento', evento.valor_min_parcelamento],
        ['percentual_juros_parcelamento', evento.percentual_juros_parcelamento],
        ['qtde_max_parcelas', evento.qtde_max_parcelas.toString()],
        ['id_setor', setor.id.toString()],
        ['nome_setor', setor.nome_setor],
      ]);
      navigation.navigate('DadosEvento');
    } catch (error) {
      alert('error');
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      storeDadosEventoStorage();
    }
    setPerguntaModalVisible(false);
  }

  return (
    <Background>
      <View style={styles.Container}>
        <Text style={styles.Titulo}>Evento Selecionado</Text>
        <View style={styles.linhaSeparacao} />

        <View>
          <Text style={styles.TextTitulo}>Nome do Evento</Text>
          <Text style={styles.TextValores}>{evento.nome_evento}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 20 }}>
              <Text style={styles.TextTitulo}>Início</Text>
              <Text style={styles.TextValores}>
                {Funcoes.strToDate(evento.data_inicio)} ás{' '}
                {evento.hora_inicio.substr(0, 5)}
              </Text>
            </View>
            <View>
              <Text style={styles.TextTituloTermino}>Término</Text>
              <Text style={styles.TextValoresTermino}>
                {Funcoes.strToDate(evento.data_termino)} ás{' '}
                {evento.hora_termino.substr(0, 5)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.linhaSeparacao} />
        <Text style={styles.Titulo}>Setor Selecionado</Text>
        <View style={styles.linhaSeparacao} />

        <View>
          <Text style={styles.TextTitulo}>Nome do Setor</Text>
          <Text style={styles.TextValoresSetor}>{setor.nome_setor}</Text>
        </View>

        <View style={styles.linhaSeparacao} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.buttonConcluir}
            onPress={() => handleModalPergunta('Confirma o Evento ?')}
          >
            <Text style={styles.TextButton}>Confirmar Evento</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pergunta
        visible={isPerguntaModalVisible}
        message={questionMessage}
        close={() => handleModalResposta(false)}
        confirm={() => handleModalResposta(true)}
      />
    </Background>
  );
}

ConfirmaEventoSetor.navigationOptions = ({ navigation }) => ({
  title: 'Confirme o Evento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelecionaSetor');
      }}
    >
      <Icon name="arrow-back" size={30} color={Colors.COLORS.WHITE} />
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
    alignItems: 'flex-start',
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
  Titulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
  },
  TextValores: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
  TextValoresTermino: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
  },
  TextTitulo: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'left',
  },
  TextTituloTermino: {
    color: Colors.COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
  },
  TextValoresSetor: {
    color: Colors.COLORS.GRAY,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textAlign: 'left',
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
    alignItems: 'center',
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
    alignSelf: 'center',
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
    margin: 10,
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

ConfirmaEventoSetor.propTypes = {
  navigation: PropTypes.string,
};

ConfirmaEventoSetor.defaultProps = {
  navigation: '',
};
