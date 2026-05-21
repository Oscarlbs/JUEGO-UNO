import { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DUEL_CONFIG, GameConfig, MODE_LABELS, VARIETY_CONFIG } from './src/game/config';
import { HomeScreen } from './src/screens/HomeScreen';
import { MultiSetupScreen } from './src/screens/MultiSetupScreen';
import { GameScreen } from './src/screens/GameScreen';

type Screen = 'home' | 'multi-setup' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  const goHome = () => {
    setScreen('home');
    setGameConfig(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" />

        {screen === 'home' && (
          <HomeScreen
            onDuel={() => {
              setGameConfig(DUEL_CONFIG);
              setScreen('game');
            }}
            onVariety={() => {
              setGameConfig(VARIETY_CONFIG);
              setScreen('game');
            }}
            onMulti={() => setScreen('multi-setup')}
          />
        )}

        {screen === 'multi-setup' && (
          <MultiSetupScreen
            onStart={(players) => {
              setGameConfig({ mode: 'multi', players });
              setScreen('game');
            }}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'game' && gameConfig && (
          <GameScreen config={gameConfig} onBack={goHome} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
