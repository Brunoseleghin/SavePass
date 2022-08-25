import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  Container,
  WrapperUser,
  AboutUser,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  AddButton,
  Icon,
  BackButton,
  Title,
  WrapperLogout,
  LogoutButton,
  LogoutIcon
} from './styles';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from 'styled-components';

interface HeaderProps {
  user?: {
    name: string;
    avatar_url?: string;
  },
  title: string;
  logout?(): Promise<void>;
}

type RootStackParamList = {
  Home: undefined;
  RegisterLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function Header({ user, title, logout }: HeaderProps) {
  const { navigate, goBack } = useNavigation<NavigationProps>();

  const theme = useTheme();

  function handleAddPass() {
    navigate('RegisterLoginData');
  }

  return (
    <Container
      hasUserData={!!user}
      style={{
        ...(user
          ? {
            backgroundColor: theme.colors.primary
          }
          : {
            backgroundColor: theme.colors.white
          })
      }}
    >
      {user ? (
        <>
          <WrapperLogout>
            <LogoutButton
              onPress={logout}
            >
              <LogoutIcon name="power" />
            </LogoutButton>
          </WrapperLogout>

          <WrapperUser>
            <AboutUser>
              <Avatar source={{ uri: user.avatar_url }} />

              <TextContainer>
                <HelloMessage>
                  {title} {'\n'}
                  <BoldText>{user.name}</BoldText>
                </HelloMessage>
              </TextContainer>
            </AboutUser>

            <AddButton onPress={handleAddPass}>
              <Icon
                name="plus"
                color={theme.colors.white}
                size={24}
              />
            </AddButton>
          </WrapperUser>
        </>
      ) : (
        <>
          <BackButton onPress={goBack}>
            <Icon
              name="chevron-left"
              color={theme.colors.primary}
              size={28}
            />
          </BackButton>

          <Title>{title}</Title>
        </>
      )}
    </Container>
  );
}