import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';

export default function App() {
  const logado = useSelector(state => state.auth.logado);
  const Routes = createRouter(logado);
  return <Routes />;
}
