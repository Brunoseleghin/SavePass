import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 0 ${RFValue(24)}px;
`;

export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
`;