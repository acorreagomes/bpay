import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Principal from './pages/Principal';
import Configuracoes from './pages/Configuracoes';
import ConsultaCartao from './pages/Cartao';
import TransacoesDebito from './pages/Transacoes/Debito';
import DadosEvento from './pages/Eventos/DadosEvento';
import SelecionaEvento from './pages/Eventos/SelecionaEvento';
import SelecionaSetor from './pages/Eventos/SelecionaSetor';
import ConfirmaEventoSetor from './pages/Eventos/ConfirmaEventoSetor';
import Relatorios from './pages/Relatorios';
import TransacoesCreditoTipoPagamento from './pages/Transacoes/Credito/TipoPagamento';
import TransacoesCreditoValorPagamento from './pages/Transacoes/Credito/ValorPagamento';
import TipoPagamentoCredito from './pages/Transacoes/Credito/TipoPagamentoCredito';

export default (logado = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login: createSwitchNavigator({
          Login,
        }),
        App: {
          screen: createStackNavigator(
            {
              Principal,
              Configuracoes,
              DadosEvento,
              SelecionaEvento,
              SelecionaSetor,
              ConfirmaEventoSetor,
              TransacoesCreditoTipoPagamento,
              TransacoesCreditoValorPagamento,
              TipoPagamentoCredito,
              TransacoesDebito,
              ConsultaCartao,
              Relatorios,
            },
            {
              defaultNavigationOptions: {
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#696969' },
                headerLeftContainerStyle: {
                  marginLeft: 20,
                },
                headerRightContainerStyle: {
                  marginRight: 20,
                },
              },
            }
          ),
        },
      },
      {
        initialRouteName: logado ? 'App' : 'Login',
      }
    )
  );
