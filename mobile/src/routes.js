import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '~/constants/Colors';

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

export default (logado = false, perfilUsuario = null) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login: createSwitchNavigator({
          Login,
        }),
        App: {
          screen: createStackNavigator(
            {
              screenDrawer: createDrawerNavigator(
                {
                  Principal,
                  ConsultaCartao,
                  Configuracoes,
                  // screenConsulta: perfilUsuario.acessa_consulta_cartao
                  //   ? ConsultaCartao
                  //   : null,
                },
                {
                  intialRouteName: 'Principal',
                  drawerBackgroundColor: '#696969',
                  contentOptions: {
                    labelStyle: { color: '#fff' },
                  },
                  navigationOptions: ({ navigation }) => ({
                    headerStyle: {
                      backgroundColor: '#696969',
                    },
                    headerTitle: '',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      color: '#fff',
                    },
                    headerLeft: () => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.toggleDrawer();
                          }}
                        >
                          <Icon
                            name="menu"
                            size={30}
                            color={Colors.COLORS.WHITE}
                          />
                        </TouchableOpacity>
                      </>
                    ),
                  }),
                }
              ),
              Principal,
              Configuracoes,
              ConsultaCartao,
              TransacoesDebito,
              DadosEvento,
              SelecionaEvento,
              SelecionaSetor,
              ConfirmaEventoSetor,
              Relatorios,
              TransacoesCreditoTipoPagamento,
              TransacoesCreditoValorPagamento,
              TipoPagamentoCredito,
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
