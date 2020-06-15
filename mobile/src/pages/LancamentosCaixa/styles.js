import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { margin: 8 },
})``;
