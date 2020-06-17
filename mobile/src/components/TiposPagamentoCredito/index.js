import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Left, Info, Descricao, Detalhes } from './styles';

export default function ListaTiposPagamentoCredito({ data, onCancel }) {
  return (
    <Container>
      <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
        <Left>
          <Info>
            <Descricao>{data.descricao}</Descricao>
            <Detalhes>{data.detalhes}</Detalhes>
          </Info>
        </Left>
      </TouchableOpacity>
    </Container>
  );
}

ListaTiposPagamentoCredito.propTypes = {
  data: PropTypes.objectOf().isRequired,
  onCancel: PropTypes.func.isRequired,
};
