import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Info, Descricao, Detalhes } from './styles';

export default function Extrato({ data, profile }) {
  function cancelamento(id) {
    // usar funcao de pergunta...
    alert(id);
  }

  return (
    <Container>
      <Left>
        <Info>
          <Descricao>
            {data.tipo_transacao === 'CREDITO' ? 'Crédito' : 'Débito'} de R${' '}
            {Number(data.valor_transacao).toFixed(2)}
          </Descricao>
          <Detalhes>Local: {data.setor.nome_setor}</Detalhes>
          <Detalhes>Atendente: {data.usuario.nome}</Detalhes>
        </Info>
      </Left>
      <TouchableOpacity
        style={{ display: profile.id === 0 ? 'flex' : 'none' }}
        onPress={() => cancelamento(data.id)}
      >
        <Icon name="clear" size={25} color="#fff" />
      </TouchableOpacity>
    </Container>
  );
}
