/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '~/assets/ticket.png';
import User from '~/assets/user.png';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const usuarioLogado = 'ALESSANDRO';  //useSelector((state) => state.user.profile.nome);
  const usuario = usuarioLogado.split(' ').slice(0, 2).join(' ');
  function handleLoggout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="bPay" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{usuario}</strong>
              <Link to="/profile">Meu Perfil</Link>
              <Link onClick={handleLoggout}> Sair</Link>
            </div>
            <img src={User} alt="avatarProfile" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
