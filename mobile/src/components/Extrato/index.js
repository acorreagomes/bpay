import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Info, Descricao, Detalhes } from './styles';
import Pergunta from '~/components/Pergunta';

export default function Extrato({ data, profile, cancel }) {
  const [isPerguntaModalVisible, setPerguntaModalVisible] = useState(false);
  const [questionMessage, setQuestionMessage] = useState('');

  function handleModalPergunta(aQuestionMessage) {
    setQuestionMessage(aQuestionMessage);
    setPerguntaModalVisible(true);
  }

  function handleConfirm() {
    setPerguntaModalVisible(false);
    cancel();
  }

  return (
    <>
      <Container>
        <Left>
          <Info>
            <Descricao cancelada={data.cancelada}>
              {data.tipo_transacao === 'CREDITO' ? 'Crédito' : 'Débito'} de R${' '}
              {Number(data.valor_transacao).toFixed(2)}{' '}
              {data.cancelada ? ' - (CANCELADO)' : ''}
            </Descricao>
            <Detalhes>Local: {data.setor.nome_setor}</Detalhes>
            <Detalhes>Atendente: {data.usuario.nome}</Detalhes>
          </Info>
        </Left>
        <TouchableOpacity
          style={{
            display: profile.id === 0 && !data.cancelada ? 'flex' : 'none',
          }}
          onPress={() =>
            handleModalPergunta(
              `ATENÇÃO!!! \n\n Tem certeza que deseja cancelar essa transação permanentemente?`
            )
          }
        >
          <Icon name="delete" size={28} color="#fff" />
        </TouchableOpacity>
      </Container>
      <Pergunta
        visible={isPerguntaModalVisible}
        message={questionMessage}
        close={() => setPerguntaModalVisible(false)}
        confirm={() => handleConfirm()}
      />
    </>
  );
}
