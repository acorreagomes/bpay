import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Left, Info, NomeSetor } from './styles';

export default function Setores({ data, onCancel }) {
  return (
    <Container>
      <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
        <Left>
          <Info>
            <NomeSetor>{data.nome_setor}</NomeSetor>
          </Info>
        </Left>
      </TouchableOpacity>
    </Container>
  );
}

Setores.propTypes = {
  data: PropTypes.objectOf().isRequired,
  onCancel: PropTypes.func.isRequired,
};
