import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Left, Info, NomeEvento, DataHorario } from './styles';

export default function Eventos({ data, onCancel }) {
  return (
    <Container>
      <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
        <Left>
          <Info>
            <NomeEvento>{data.nome_evento}</NomeEvento>
            <DataHorario>
              Horário de Início : Ás {data.hora_inicio} Horas.
            </DataHorario>
          </Info>
        </Left>
      </TouchableOpacity>
    </Container>
  );
}

Eventos.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onCancel: PropTypes.func.isRequired,
};
