import React from 'react';
import PropTypes from 'prop-types';

import { Container, Titulo, Valor } from './styles';

export default function Cartao({ data }) {
  return (
    <>
      <Container>
        <Titulo>Cliente : </Titulo>
        <Valor>
          {data && data.cartao.cliente
            ? data.cartao.cliente.nome
            : 'Não Relacionado'}
        </Valor>
      </Container>
      <Container>
        <Titulo>Documento : </Titulo>
        <Valor>
          {data && data.cartao.cliente
            ? data.cartao.cliente.documento
            : 'Não Relacionado'}
        </Valor>
      </Container>
      <Container>
        <Titulo>Número do Chip : </Titulo>
        <Valor>{data ? data.cartao.id_chip : '----'}</Valor>
      </Container>
    </>
  );
}

Cartao.propTypes = {
  data: PropTypes.objectOf().isRequired,
};
