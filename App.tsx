import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, LogBox } from 'react-native';
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium
} from '@expo-google-fonts/rubik';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';

import { Routes } from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';
import theme from './src/global/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const { userStorageLoading } = useAuth();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Rubik_300Light,
          Rubik_400Regular,
          Rubik_500Medium
        });
        await userStorageLoading;
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor={theme.colors.primary} />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}