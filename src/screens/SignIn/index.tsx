import React, { useState } from 'react';
import { Platform, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

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
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false);
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

        {
          isLoading &&
          <ActivityIndicator
            color={theme.colors.primary}
            size="small"
            style={{ marginTop: 15 }}
          />
        }
      </Footer>
    </Container>
  );
}