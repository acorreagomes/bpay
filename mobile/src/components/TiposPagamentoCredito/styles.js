import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
`;

export const Info = styled.View``;

export const Descricao = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  align-self: center;
`;

export const Detalhes = styled.Text`
  font-size: 15px;
  color: #999;
  margin-top: 4px;
`;
