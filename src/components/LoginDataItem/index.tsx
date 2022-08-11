import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import {
  Container,
  Card,
  ShowPasswordButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  BoldTitle,
  Email,
  WrapperButton,
  EditButton,
  RemoveButton,
} from './styles';

interface Props {
  service_name: string;
  email: string;
  password: string;
  onPressEdit: () => void;
  onPressRemove: () => void;
}

export function LoginDataItem({
  service_name,
  email,
  password,
  onPressEdit,
  onPressRemove
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  const theme = useTheme();

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container
      colors={[
        passIsVisible
          ? theme.colors.white_ice
          : theme.colors.white,
        theme.colors.white
      ]}
    >
      <ShowPasswordButton
        onPress={handleTogglePassIsVisible}
      >
        <Icon
          name={passIsVisible ? "eye" : "eye-off"}
          color={passIsVisible ? theme.colors.primary : theme.colors.gray}
        />
      </ShowPasswordButton>

      {passIsVisible
        ? (
          <Card>
            <PassData>
              <Title>{service_name}</Title>
              <Password>{password}</Password>
            </PassData>

            <WrapperButton>
              <EditButton
                onPress={onPressEdit}
              >
                <Icon name="edit" color={theme.colors.gray} />
              </EditButton>

              <RemoveButton
                onPress={onPressRemove}
              >
                <Icon name="trash" color={theme.colors.gray} />
              </RemoveButton>
            </WrapperButton>
          </Card>
        )
        : (
          <Card>
            <LoginData>
              <BoldTitle>{service_name}</BoldTitle>
              <Email>{email}</Email>
            </LoginData>

            <WrapperButton>
              <EditButton
                onPress={onPressEdit}
              >
                <Icon name="edit" color={theme.colors.gray} />
              </EditButton>

              <RemoveButton
                onPress={onPressRemove}
              >
                <Icon name="trash" color={theme.colors.gray} />
              </RemoveButton>
            </WrapperButton>
          </Card>
        )
      }
    </Container >
  );
}