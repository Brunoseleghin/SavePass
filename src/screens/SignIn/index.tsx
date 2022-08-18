import React from 'react';
import { Platform, Alert } from 'react-native';
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
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo source={LogoSavePass} />

          <Title>
            Salve suas {'\n'}
            contas de forma {'\n'}
            simples e segura
          </Title>

          {Platform.OS === 'ios' ?
            <SignInTitle>
              Faça seu login com {'\n'}
              uma das contas abaixo
            </SignInTitle>
            :
            <SignInTitle>
              Faça seu login com {'\n'}
              uma conta Google
            </SignInTitle>
          }

        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === 'ios' &&
            <SignInSocialButton
              title='Entrar com Apple'
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>
      </Footer>
    </Container>
  );
}