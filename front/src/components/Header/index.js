/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '~/assets/ticket.png';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const usuarioLogado = useSelector((state) => state.user.profile.nome);
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
              <strong>{usuarioLogado}</strong>
              <Link to="/profile">Meu Perfil</Link>
              <Link onClick={handleLoggout}> Sair</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="avatarProfile"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
