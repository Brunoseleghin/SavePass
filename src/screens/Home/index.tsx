import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  Metadata,
  Title,
  TotalPassCount,
  LoginList,
} from './styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../hooks/auth';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

type RootStackParamList = {
  Home: undefined;
  EditLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const { navigate } = useNavigation<NavigationProps>();
  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  const { user, signOut } = useAuth();

  async function loadData() {
    const dataKey = `@savepass:logins_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    if (response !== null) {
      const passwords = response ? JSON.parse(response) : [];

      setData(passwords);
      setSearchListData(passwords);
    }
  }

  function handleFilterLoginData() {
    if (searchText) {
      const passwordFiltered = data.filter(data => data.service_name.toLowerCase().includes(searchText.toLowerCase()));
      setSearchListData(passwordFiltered);
    }
  }

  function handleChangeInputText(text: string) {
    if (!text) {
      setSearchListData(data);
    }

    setSearchText(text);
  }

  function handleEditLoginData(loginData: any) {
    navigate('EditLoginData', loginData);
  }

  async function handleRemoveLoginData(id: string) {
    const dataKey = `@savepass:logins_user:${user.id}`;
    const collectionFiltered = data.filter(data => data.id !== id);

    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(collectionFiltered));
      setData(collectionFiltered);
      setSearchListData(collectionFiltered);
    } catch (error) {
      throw new Error(error);
    }
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  return (
    <>
      <Header
        title='Olá,'
        user={{
          name: user.name,
          avatar_url: user.photo
        }}
        logout={signOut}
      />
      <Container>
        <SearchBar
          placeholder="Qual login você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}
          onSearchButtonPress={handleFilterLoginData}
        />

        <Metadata>
          <Title>Seus Logins</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, '0')} ao total`
              : 'Nada a ser exibido'
            }
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item) => item.id}
          data={searchListData}
          renderItem={({ item: loginData }) => {
            return <LoginDataItem
              service_name={loginData.service_name}
              email={loginData.email}
              password={loginData.password}
              onPressEdit={() => handleEditLoginData(loginData)}
              onPressRemove={() => handleRemoveLoginData(loginData.id)}
            />
          }}
        />
      </Container>
    </>
  )
}