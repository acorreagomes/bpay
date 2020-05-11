import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: -20px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
