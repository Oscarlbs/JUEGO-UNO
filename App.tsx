import { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GameConfig } from './src/game/config';
import { HomeScreen }           from './src/screens/HomeScreen';
import { TwoPlayerSetupScreen } from './src/screens/TwoPlayerSetupScreen';
import { MultiSetupScreen }     from './src/screens/MultiSetupScreen';
import { GameScreen }           from './src/screens/GameScreen';

type Screen = 'home' | 'duel-setup' | 'variety-setup' | 'multi-setup' | 'game';

export default function App() {
  const [screen,     setScreen]     = useState<Screen>('home');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  const goHome = () => { setScreen('home'); setGameConfig(null); };

  const startGame = (config: GameConfig) => {
    setGameConfig(config);
    setScreen('game');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />

        {screen === 'home' && (
          <HomeScreen
            onDuel={()    => setScreen('duel-setup')}
            onVariety={()  => setScreen('variety-setup')}
            onMulti={()   => setScreen('multi-setup')}
          />
        )}

        {screen === 'duel-setup' && (
          <TwoPlayerSetupScreen
            mode="duel"
            onStart={(p1, p2) => startGame({ mode: 'duel',    players: [p1, p2] })}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'variety-setup' && (
          <TwoPlayerSetupScreen
            mode="variety"
            onStart={(p1, p2) => startGame({ mode: 'variety', players: [p1, p2] })}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'multi-setup' && (
          <MultiSetupScreen
            onStart={(players) => startGame({ mode: 'multi', players })}
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
  screen: { flex: 1, backgroundColor: '#0d0d1a' },
});
