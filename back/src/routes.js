import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import ClienteController from './app/controllers/ClienteController';
import TransacaoController from './app/controllers/TransacaoController';
import CartaoController from './app/controllers/CartaoController';
import ProdutorController from './app/controllers/ProdutorController';
import SessionController from './app/controllers/SessionController';
import EventoController from './app/controllers/EventoController';
import SetorController from './app/controllers/SetorController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/usuarios', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/usuarios', UsuarioController.update);

routes.get('/clientes/:documento', ClienteController.index);
routes.post('/clientes', ClienteController.store);

routes.post('/transacoes', TransacaoController.store);

routes.get('/cartoes/situacao', CartaoController.situacao);
routes.post('/cartoes', CartaoController.store);
routes.put('/cartoes/transfenciaesaldo', CartaoController.update);
routes.put('/cartoes/bloqueio', CartaoController.bloqueio);

routes.post('/produtores', ProdutorController.store);

routes.get('/eventos/eventosprodutor', EventoController.eventoProdutor);
routes.get('/eventos/:id/relatorio', EventoController.eventoRelatorio);
routes.post('/eventos', EventoController.store);

routes.get('/setores/eventos/:id_evento', SetorController.setoresEvento);
routes.post('/setores', SetorController.store);

export default routes;
