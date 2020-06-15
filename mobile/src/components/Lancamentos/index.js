import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-native';
import Modal from 'react-native-modal';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import { Dropdown } from 'react-native-material-dropdown';
import Textarea from 'react-native-textarea';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Colors from '~/constants/Colors';
import Estilos from '~/constants/Estilos';
import Loading from '~/components/Loading';
import Mensagens from '~/components/Mensagens';
import Pergunta from '~/components/Pergunta';

export default function Lancamentos({ visible, dadosEvento, close }) {
  const listRef = useRef();
  const [valorTransacao, setValorTransacao] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [questionMessage, setQuestionMessage] = useState('');
  const [descricaoTransacao, setDescricaoTransacao] = useState('');
  const data = [
    {
      value: 'Sangria',
    },
    {
      value: 'Suprimento',
    },
    {
      value: 'Saldo Inicial',
    },
  ];

  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  function handleModalPergunta(aQuestionMessage) {
    if (!valorTransacao || valorTransacao <= 0) {
      showMessage('Valor Inválido', 'error');
    } else {
      setQuestionMessage(aQuestionMessage);
      setPerguntaModalVisible(true);
    }
  }

  function getTipoTransacao() {
    switch (listRef.current.selectedIndex()) {
      case 0: {
        return 'SANGRIA';
      }
      case 1: {
        return 'SUPRIMENTO';
      }
      case 2: {
        return 'SALDO_INICIAL';
      }
      default: {
        return 'SALDO_INICIAL';
      }
    }
  }

  async function ExecutaLancamento() {
    try {
      const response = await api.post('/transacoes/caixa', {
        id_evento: dadosEvento.id_evento,
        id_setor: dadosEvento.id_setor,
        id_terminal: dadosEvento.id_terminal,
        valor_transacao: valorTransacao,
        tipo_transacao: getTipoTransacao(),
        descricao_sangria_suprimentos: descricaoTransacao,
      });
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        Toast.show(
          'Lançamento Efetuado com Sucesso!',
          Toast.SHORT,
          Toast.BOTTOM,
          Estilos.TOAST_STYLE
        );
      }
      setLoading(false);
      setValorTransacao(0);
      setDescricaoTransacao('');
      close();
    } catch (error) {
      alert(error);
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      setLoading(true);
      ExecutaLancamento();
    }
    setPerguntaModalVisible(false);
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}
    >
      <Modal
        isVisible={visible}
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
          <Text
            style={{
              color: Colors.COLORS.WHITE,
              fontSize: 30,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Lançamentos de Caixa
          </Text>

          <Dropdown
            ref={listRef}
            label="Tipo de Lançamento"
            textColor={Colors.COLORS.GRAY}
            baseColor={Colors.COLORS.WHITE}
            itemColor={Colors.COLORS.GRAY}
            fontSize={30}
            data={data}
            value="Saldo Inicial"
          />
          <Text style={{ color: Colors.COLORS.WHITE }}>Valor da Despesa</Text>
          <NumericInput
            type="decimal"
            decimalPlaces={2}
            value={valorTransacao}
            onUpdate={setValorTransacao}
            placeholder="0,00"
            placeholderTextColor={Colors.COLORS.GRAY}
            keyboardType="phone-pad"
            returnKeyType="send"
            style={{
              marginVertical: 8,
              color: Colors.COLORS.WHITE,
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              borderColor: Colors.COLORS.GRAY,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
          />
          <Text style={{ color: Colors.COLORS.WHITE }}>
            Descrição da Despesa
          </Text>
          <View
            style={{
              marginVertical: 10,
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: '#fff',
            }}
          >
            <Textarea
              containerStyle={{ Height: 180, Padding: 5 }}
              style={{
                textAlignVertical: 'top',
                fontSize: 16,
                color: Colors.COLORS.GRAY,
              }}
              maxLength={255}
              placeholder="Informe a descrição da despesa..."
              placeholderTextColor={Colors.COLORS.GRAY}
              underlineColorAndroid="transparent"
              value={descricaoTransacao}
              onChangeText={setDescricaoTransacao}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={Estilos.BUTTON_CANCEL} onPress={close}>
              <Text style={Estilos.BUTTON_TEXT}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Estilos.BUTTON_OK}
              onPress={() => handleModalPergunta('Confirma o Lançamento ? ')}
            >
              <Text style={Estilos.BUTTON_TEXT}>Gravar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pergunta
        visible={isPerguntaModalVisible}
        message={questionMessage}
        close={() => setPerguntaModalVisible(false)}
        confirm={() => handleModalResposta(true)}
      />
      <Mensagens
        type={dialogType}
        visible={isDialogVisible}
        message={dialogMessage}
        close={() => setisDialogVisible(false)}
      />
      <Loading loading={loading} message="Efetuando Lançamento.." />
    </View>
  );
}

Lancamentos.propTypes = {
  visible: PropTypes.bool,
  dadosEvento: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

Lancamentos.defaultProps = {
  visible: false,
};
