import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      senha,
    });

    const { token, usuario } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, usuario));
  } catch (error) {
    Alert.alert('Erro de Autenticação', 'Verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
