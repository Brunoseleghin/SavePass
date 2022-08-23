import styled, { css } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
  hasUserData: boolean;
}

export const Container = styled.View<ContainerProps>`
  padding: ${({ hasUserData }) => hasUserData
    ? `${getStatusBarHeight(true) + 0}px  24px 60px 24px`
    : `${getStatusBarHeight(true) + 9}px 0 23px 0`
  }
  ${({ hasUserData }) => hasUserData && css`
    justify-content: space-between;
  `}
`;

export const WrapperUser = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AboutUser = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  border-radius: 4px;
`;

export const TextContainer = styled.View`
  margin-left: 16px;
`;

export const HelloMessage = styled.Text`
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(26)}px;
  font-family: ${({theme}) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.white}
`;

export const BoldText = styled.Text`
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const AddButton = styled.Pressable`
  padding: ${RFValue(14.5)}px;
  border: 1.5px ${({ theme }) => theme.colors.border_primary};
  border-radius: 4px;
`;

export const Icon = styled(Feather)``;

export const BackButton = styled.Pressable`
  position: absolute;
  left: 13px;
  bottom: 23px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.blue_gray};
  margin: auto;
`;

export const WrapperLogout = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(
  BorderlessButton as new(props: any) => BorderlessButton
)``;

export const LogoutIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;