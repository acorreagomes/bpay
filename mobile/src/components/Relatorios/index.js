import React from 'react';

import { Container, Left, Info, NomeSetor, ValorSetor } from './styles';

export default function Relatorios({ data }) {
  return (
    <Container>
      <Left>
        <Info>
          <NomeSetor>{data.nome_setor}</NomeSetor>
          <ValorSetor>R$ {Number(data.Total).toFixed(2)}</ValorSetor>
        </Info>
      </Left>
    </Container>
  );
}
