import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(LinearGradient).attrs({
  end: { x: 1, y: 0 }
})`
  border: 1px ${({ theme }) => theme.colors.border_white};
  flex-direction: row;
  align-items: center;
  min-height: ${RFValue(80)}px;
  width: 100%;
  border-radius: 4px;
  padding: 22px 20px;
  margin-bottom: 8px;
`;

export const Card = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShowPasswordButton = styled.TouchableOpacity``;

export const Icon = styled(Feather).attrs({
  size: 24,
})`
  margin-right: 20px;
  opacity: 0.6;
`;

export const PassData = styled.View`
  width: 90%;
`;

export const Title = styled.Text`
  margin-bottom: ${RFValue(4)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.gray};
`;

export const Password = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LoginData = styled.View`
  width: 90%;
`;

export const BoldTitle = styled.Text`
  margin-bottom: ${RFValue(4)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme}) => theme.colors.blue_gray};
`;

export const Email = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.gray};
`;

export const WrapperButton = styled.View`
`;

export const EditButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})`
  margin-bottom: 10px;
`;

export const RemoveButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5
})``;
