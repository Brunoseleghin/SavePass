import React from 'react';
import { Platform } from 'react-native';
import {
  Container,
  TitleWrapper,
  Logo,
  Header,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

import LogoSavePass from '../../assets/logo.png';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const { user } = useAuth();
  console.log(user.name);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo source={LogoSavePass} />

          <Title>
            Salve seus {'\n'}
            logins de forma {'\n'}
            simples e segura
          </Title>

          <SignInTitle>
            Faça seu login com {'\n'}
            uma das contas abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
          />

          {/*Platform.OS === 'ios' &&*/
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
            />
          }
        </FooterWrapper>
      </Footer>
    </Container>
  );
}