import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from 'react';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@savepass:user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const name = userInfo.name;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        setUser({
          id: userInfo.id,
          email: userInfo.email!,
          name,
          photo: userInfo.picture ? userInfo.picture : photo
        });

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        if (credential.email !== null) {
          const userInfo = {
            id: credential.user,
            email: credential.email!,
            name,
            photo
          } as User;

          setUser(userInfo);

          await AsyncStorage.setItem(`@savepass:userid:${credential.user}`, JSON.stringify(userInfo));
          await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
        } else {
          const userStoraged = await AsyncStorage.getItem(`@savepass:userid:${credential.user}`);

          if (userStoraged) {
            const credentialsStoraged = JSON.parse(userStoraged);

            const name = credentialsStoraged.name;
            const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

            const userInfo = {
              id: credentialsStoraged.id,
              email: credentialsStoraged.email!,
              name,
              photo
            } as User;

            setUser(userInfo);

            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
          } else {
            const userInfo = {
              id: credential.user,
              email: credential.email!,
              name,
              photo
            } as User;

            setUser(userInfo);

            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged);

        const name = userLogged.name;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userInfo = {
          id: userLogged.id,
          email: userLogged.email!,
          name: userLogged.name!,
          photo: userLogged.picture! ? userLogged.picture : photo
        } as User;

        setUser(userInfo);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      userStorageLoading,
      signInWithGoogle,
      signInWithApple,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }