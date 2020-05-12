import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import Logo from '~/assets/ticket2.png';

export default function Registrar() {
  const schema = Yup.object().shape({
    nome: Yup.string().required('Informe seu Nome!'),
    email: Yup.string()
      .email('Insira um e-mail válido!')
      .required('Informe seu e-mail!'),
    senha: Yup.string().required('Informe sua senha!'),
  });

  const dispatch = useDispatch();

  function handleSubmit({ nome, email, senha }) {
    dispatch(signUpRequest(nome, email, senha));
  }
  return (
    <>
      <img src={Logo} alt="bPay" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="nome" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="senha" type="password" placeholder="Sua senha" />
        <button type="submit">Cadastrar</button>
        <Link to="/dashboard">Já tenho conta</Link>
      </Form>
    </>
  );
}
