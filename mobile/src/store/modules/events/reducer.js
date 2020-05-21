import produce from 'immer';

const INITIAL_STATE = {
  id_evento: null,
  nome_evento: null,
  data_inicio: null,
  hora_inicio: null,
  data_termino: null,
  hora_termino: null,
  valor_min_parcelamento: null,
  percentual_juros_parcelamento: null,
  qtde_max_parcelas: null,
  id_setor: null,
  nome_setor: null,
};

export default function event(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SAVE_EVENTS_DATA': {
        draft.id_evento = action.payload.id_evento;
        draft.nome_evento = action.payload.nome_evento;
        draft.data_inicio = action.payload.data_inicio;
        draft.hora_inicio = action.payload.hora_inicio;
        draft.data_termino = action.payload.data_termino;
        draft.hora_termino = action.payload.hora_termino;
        draft.valor_min_parcelamento = action.payload.valor_min_parcelamento;
        draft.percentual_juros_parcelamento =
          action.payload.percentual_juros_parcelamento;
        draft.qtde_max_parcelas = action.payload.qtde_max_parcelas;
        draft.id_setor = action.payload.id_setor;
        draft.nome_setor = action.payload.id_setor;
        break;
      }
      case '@auth/CLEAR_EVENTS_DATA': {
        draft.id_evento = null;
        draft.nome_evento = null;
        draft.data_inicio = null;
        draft.hora_inicio = null;
        draft.data_termino = null;
        draft.hora_termino = null;
        draft.valor_min_parcelamento = null;
        draft.percentual_juros_parcelamento = null;
        draft.qtde_max_parcelas = null;
        draft.id_setor = null;
        draft.nome_setor = null;
        break;
      }
      default:
    }
  });
}
