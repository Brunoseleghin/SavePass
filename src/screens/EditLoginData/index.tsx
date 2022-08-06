import React from 'react';
import { KeyboardAvoidingView, Alert, Platform } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import uuid from 'react-native-uuid';

import { Container, Form } from './styles';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { Header } from '../../components/Header';

interface FormData {
  service_name?: string;
  email?: string;
  password?: string;
}

const schema = Yup.object().shape({
  service_name: Yup.string().required('Nome do serviço é obrigatório'),
  email: Yup.string().required('Email é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!')
});

type RootStackParamList = {
  Home: undefined;
  EditLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'EditLoginData'>;

export function EditLoginData() {
  const { navigate } = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleEdit(formData: FormData) {
    const newLoginData = {
      id: String(uuid.v4()),
      ...formData
    }

    const dataKey = '@savepass:logins';

    try {
      const collection = await AsyncStorage.getItem(dataKey);
      const currentCollection = collection ? JSON.parse(collection) : [];
      const collectionFormatted = [...currentCollection, newLoginData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(collectionFormatted));

      reset();
      navigate('Home');
    } catch (error: any) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Header
        title='Edição de login'
      />
      <Container>
        <Form>
          <Input
            title="Nome do serviço"
            name="service_name"
            control={control}
            autoCapitalize="sentences"
            autoCorrect
            error={errors.service_name && (errors.service_name as any).message}
          />
          <Input
            title="E-mail ou usuário"
            name="email"
            error={errors.email && (errors.email as any).message}
            control={control}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input
            testID="password-input"
            title="Senha"
            name="password"
            error={errors.password && (errors.password as any).message}
            control={control}
            secureTextEntry
          />
          <Button
            style={{
              marginTop: RFValue(8)
            }}
            title="Salvar"
            onPress={handleSubmit(handleEdit)}
          />
        </Form>
      </Container>

    </KeyboardAvoidingView>
  );
}