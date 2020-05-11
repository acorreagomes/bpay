import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import Logo from '~/assets/ticket2.png';

export default function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido!')
      .required('Informe seu e-mail!'),
    senha: Yup.string().required('Informe sua senha!'),
  });

  const dispatch = useDispatch();

  function handleSubmit(email, senha) {
    dispatch(signInRequest(email, senha));
  }
  return (
    <>
      <img src={Logo} alt="EasyControl" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <text>Ola, Seja Bem-Vindo(a)</text>
        <text>Entre com suas credenciais.</text>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="senha" type="senha" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <Link to="/dashboard">Cadastrar-me</Link>
        <Link to="/dashboard">Esqueci minha senha</Link>
      </Form>
    </>
  );
}
