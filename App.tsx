import { useState, useCallback, useEffect, } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { myColors } from './src/styles/Colors';
import { ThemeContext } from './src/context/ThemeContext';
import MyKeyboard from './src/components/MyKeyboard';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 8000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <View style={theme === 'light' ? styles.container : [styles.container, {backgroundColor: 'black'}]} onLayout={onLayoutRootView}>
        <View style={{marginTop:30}} />
        <Switch
          value={theme === 'dark'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <MyKeyboard />
      </View>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});