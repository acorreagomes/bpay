import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Funcoes from '~/utils/Funcoes';

import { Container, Left, Info, NomeEvento, DataHorario } from './styles';

export default function Eventos({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return Funcoes.strToDate(data.data_inicio);
  }, [data.data_inicio]);
  return (
    <Container>
      <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
        <Left>
          <Info>
            <NomeEvento>{data.nome_evento}</NomeEvento>
            <DataHorario>
              {dateParsed} ás {data.hora_inicio}
            </DataHorario>
          </Info>
        </Left>
      </TouchableOpacity>
    </Container>
  );
}
