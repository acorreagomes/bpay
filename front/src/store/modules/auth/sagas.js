import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
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
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na Autenticação, Verifique seus dados!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, email, senha } = payload;

    const response = yield call(api.post, 'usuarios', {
      nome,
      email,
      senha,
    });
    if (response.data.error) {
      toast.error(response.data.error);
    } else {
      toast.success('Usuário cadastrado com sucesso!');
      history.push('/');
    }
  } catch (error) {
    toast.error('Falha no cadastro, Verifique seus dados!');
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
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
