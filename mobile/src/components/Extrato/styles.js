import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View``;

export const Descricao = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-decoration: ${props => (props.cancelada ? 'line-through' : null)};
  color: ${props => (props.cancelada ? 'gray' : '#fff')};
`;

export const Detalhes = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;
