import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Info, Descricao, Detalhes } from './styles';
import api from '~/services/api';
import Pergunta from '~/components/Pergunta';
import Mensagens from '~/components/Mensagens';
import Loading from '~/components/Loading';

export default function Extrato({ data, profile }) {
  const [loading, setLoading] = useState(false);
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [questionMessage, setQuestionMessage] = useState('');
  const [idSelecionado, setIdSelecionado] = useState(0);
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');


  function showMessage(Message, DialogType = '') {
    setDialogType(DialogType);
    setDialogMessage(Message);
    setisDialogVisible(true);
  }

  function handleModalPergunta(aQuestionMessage, id) {
    setIdSelecionado(id);
    setQuestionMessage(aQuestionMessage);
    setPerguntaModalVisible(true);
  }

  async function cancelamento() {
    try {
      const response = await api.delete(
        `/transacoes/${idSelecionado}/cancelar`
      );
      if (response.data.error) {
        showMessage(response.data.error, 'error');
      } else {
        showMessage('Cancelado com Sucesso!');
      }
      setLoading(false);
    } catch (error) {
      showMessage(error, 'error');
    }
  }

  function handleModalResposta(Response) {
    if (Response) {
      setLoading(true);
      cancelamento();
    }
    setPerguntaModalVisible(false);
  }

  function handleModal() {
    setisDialogVisible(false);
  }

  return (
    <>
      <Container>
        <Left>
          <Info>
            <Descricao cancelada={data.cancelada}>
              {data.tipo_transacao === 'CREDITO' ? 'Crédito' : 'Débito'} de R${' '}
              {Number(data.valor_transacao).toFixed(2)} {data.cancelada ? ' - (CANCELADO)' : ''}
            </Descricao>
            <Detalhes>Local: {data.setor.nome_setor}</Detalhes>
            <Detalhes>Atendente: {data.usuario.nome}</Detalhes>
          </Info>
        </Left>
        <TouchableOpacity
          style={{ display: profile.id === 0 && !data.cancelada ? 'flex' : 'none' }}
          onPress={() =>
            handleModalPergunta(
              `ATENÇÃO!!! \n\n Uma vez cancelado não poderá mais ser revertido! \n\n Confirma o Cancelamento ?`,
              data.id
            )
          }
        >
          <Icon name="delete" size={28} color="#fff" />
        </TouchableOpacity>
      </Container>
      <Mensagens
        type={dialogType}
        visible={isDialogVisible}
        message={dialogMessage}
        close={() => handleModal()}
      />
      <Pergunta
        visible={isPerguntaModalVisible}
        message={questionMessage}
        close={() => handleModalResposta(false)}
        confirm={() => handleModalResposta(true)}
      />
      <Loading loading={loading} message="Cancelando Transação.." />
    </>
  );
}
