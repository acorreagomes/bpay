import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 8px;
  padding: 8px;
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

export const NomeEvento = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #fff;
`;

export const DataHorario = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 4px;
`;
