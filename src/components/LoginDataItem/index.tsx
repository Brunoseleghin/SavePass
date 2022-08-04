import React, { useState } from 'react';

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

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container
      colors={[
        passIsVisible
          ? '#EBF2FF'
          : '#ffffff',
        '#ffffff'
      ]}
    >
      <ShowPasswordButton
        onPress={handleTogglePassIsVisible}
      >
        <Icon
          name={passIsVisible ? "eye" : "eye-off"}
          color={passIsVisible ? '#1967FB' : '#888D97'}
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
                <Icon name="edit" color="#888D97" />
              </EditButton>

              <RemoveButton
                onPress={onPressRemove}
              >
                <Icon name="trash" color="#888D97" />
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
                <Icon name="edit" color="#888D97" />
              </EditButton>

              <RemoveButton
                onPress={onPressRemove}
              >
                <Icon name="trash" color="#888D97" />
              </RemoveButton>
            </WrapperButton>
          </Card>
        )
      }
    </Container >
  );
}