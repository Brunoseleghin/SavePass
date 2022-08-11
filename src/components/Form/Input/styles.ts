import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from '@expo/vector-icons/Feather';

export const Container = styled.View`
  margin-bottom: ${RFValue(17)}px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 7px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${RFValue(13)}px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.white};
  border: 1px ${({ theme }) => theme.colors.border_white};
  padding: 0 20px;
  border-radius: 4px;
  height: ${RFValue(56)}px;
  width: 100%;
`;

export const FormInput = styled(TextInput)`
  color: ${({ theme }) => theme.colors.blue_gray};
  font-size: ${(RFValue(15))}px;
  flex: 1;
  height: 100%;
`;

export const ToggleShowPassButton = styled.Pressable`
  margin-left: 20px;
`;

export const Icon = styled(Feather).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.gray
}))`
  opacity: 0.6;
`;