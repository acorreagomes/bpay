import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  userNameLogged: null,
  logado: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCESS': {
        draft.token = action.payload.token;
        draft.userNameLogged = action.payload.usuario.nome;
        draft.logado = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.userNameLogged = null;
        draft.logado = false;
        break;
      }
      default:
    }
  });
}
