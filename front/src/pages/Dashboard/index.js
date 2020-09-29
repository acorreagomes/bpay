import React from 'react';
import api from '~/services/api';

import { Container, DadosCliente } from './styles';

export default function Dashboard() {
  return ( 
    <Container>
      <header>
        <strong>
          Cadastro de Clientes
        </strong>
      </header>

      <ul>
        <DadosCliente>
          <strong>Alessandro Corrêa Gomes</strong>
          <span>Compra de Abadá</span>
        </DadosCliente>
        <DadosCliente>
          <strong>Letícia Paula Vessequi Gomes</strong>
          <span>Compra de Abadá</span>
        </DadosCliente>
        <DadosCliente>
          <strong>Lorena Sofia Vessequi Gomes</strong>
          <span>Compra de Abadá</span>
        </DadosCliente>
        <DadosCliente>
          <strong>Lorena Sofia Vessequi Gomes</strong>
          <span>Compra de Abadá</span>
        </DadosCliente>
      </ul>
    </Container>
  )
}
