import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload.email;

    const response = yield call(api.post, 'sessions', {
      email,
      senha,
    });

    const { token, usuario } = response.data;
    yield put(signInSucess(token, usuario));
    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na Autenticação, Verifique seus dados!');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
