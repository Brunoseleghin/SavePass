import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container,
  Input,
  Button,
  Icon
} from './styles';

interface SearchBarProps extends TextInputProps {
  onSearchButtonPress: () => void;
}

export function SearchBar({
  style,
  onSearchButtonPress,
  ...rest
}: SearchBarProps) {

  const theme = useTheme();

  return (
    <Container>
      <Input
        {...rest}
        placeholderTextColor={theme.colors.grey}
      />

      <Button onPress={onSearchButtonPress} testID="search-button">
        <Icon name="search" />
      </Button>
    </Container>
  )
}