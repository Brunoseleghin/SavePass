import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  Container,
  AboutUser,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  SecondaryMessage,
  AddButton,
  Icon,
  BackButton,
  Title,
} from './styles';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTheme } from 'styled-components';

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  },
  title: string;
}

type RootStackParamList = {
  Home: undefined;
  RegisterLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function Header({ user, title }: HeaderProps) {
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
          <AboutUser>
            <Avatar source={{ uri: user.avatar_url }} />

            <TextContainer>
              <HelloMessage>
                {title} <BoldText>{user.name}</BoldText>
              </HelloMessage>

              <SecondaryMessage>
                Sinta-se seguro aqui
              </SecondaryMessage>
            </TextContainer>
          </AboutUser>

          <AddButton onPress={handleAddPass}>
            <Icon
              name="plus"
              color={theme.colors.white}
              size={24}
            />
          </AddButton>
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