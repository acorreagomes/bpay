import React from 'react';

import { Container, Titulo, Valor } from './styles';

export default function DadosTerminal({ data }) {
  return (
    <>
      <Container>
        <Titulo>Modelo : </Titulo>
        <Valor>
          {data && data.terminal.modelo
            ? data.terminal.modelo
            : 'Não Relacionado'}
        </Valor>
      </Container>
      <Container>
        <Titulo>Fabricante : </Titulo>
        <Valor>
          {data && data.terminal.fabricante
            ? data.terminal.fabricante
            : 'Não Relacionado'}
        </Valor>
      </Container>
      <Container>
        <Titulo>Endereço MAC : </Titulo>
        <Valor>{data ? data.terminal.endereco_mac : '----'}</Valor>
      </Container>
    </>
  );
}
