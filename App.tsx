import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';

const CustomStatusBar = (
  {
    backgroundColor
  }: any
) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }} >
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle='light-content'
        translucent
      />
    </View>
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Rubik_300Light,
          Rubik_400Regular,
          Rubik_500Medium
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider
      onLayout={onLayoutRootView}
      style={{
        flex: 1
      }}
    >
      <NavigationContainer>
        <CustomStatusBar backgroundColor='#1967FB' />

        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}