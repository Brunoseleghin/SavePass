import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Logo = styled.Image`
  height: 100px;
  width: 140px
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;

  background-color: #F0F2F5;

  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: 'Rubik_500Medium';
  color: #3D434D;

  text-align: center;
  margin-top: 40px;
`;

export const SignInTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: 'Rubik_500Medium';
  color: #3D434D;

  text-align: center;
  margin-top: 80px;
  margin-bottom: 67px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: #F0F2F5;
`;

export const FooterWrapper = styled.View`
  padding: 0 32px;
  justify-content: space-between;
`;
