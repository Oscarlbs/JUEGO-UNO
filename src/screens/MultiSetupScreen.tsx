import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { createMultiConfig, MAX_PLAYERS, MIN_PLAYERS } from '../game/config';

interface Props {
  onStart: (players: string[]) => void;
  onBack: () => void;
}

export function MultiSetupScreen({ onStart, onBack }: Props) {
  const [count, setCount] = useState(3);
  const [names, setNames] = useState<string[]>(createMultiConfig(3).players);

  const setPlayerCount = (next: number) => {
    const safe = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, next));
    setCount(safe);
    setNames((prev) => {
      const base = createMultiConfig(safe).players;
      return base.map((defaultName, i) => prev[i]?.trim() || defaultName);
    });
  };

  const updateName = (index: number, value: string) => {
    setNames((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleStart = () => {
    const finalNames = names.map((name, i) => name.trim() || `Jugador ${i + 1}`);
    onStart(finalNames);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Volver</Text>
      </Pressable>

      <Text style={styles.title}>Multijugador</Text>
      <Text style={styles.subtitle}>¿Cuántos jugáis?</Text>

      <View style={styles.counterRow}>
        <Pressable
          style={[styles.counterBtn, count <= MIN_PLAYERS && styles.counterBtnDisabled]}
          onPress={() => setPlayerCount(count - 1)}
          disabled={count <= MIN_PLAYERS}
        >
          <Text style={styles.counterBtnText}>−</Text>
        </Pressable>
        <Text style={styles.count}>{count}</Text>
        <Pressable
          style={[styles.counterBtn, count >= MAX_PLAYERS && styles.counterBtnDisabled]}
          onPress={() => setPlayerCount(count + 1)}
          disabled={count >= MAX_PLAYERS}
        >
          <Text style={styles.counterBtnText}>+</Text>
        </Pressable>
      </View>

      <Text style={styles.namesTitle}>Nombres (opcional)</Text>
      <View style={styles.namesList}>
        {names.map((name, i) => (
          <TextInput
            key={i}
            style={styles.nameInput}
            value={name}
            onChangeText={(text) => updateName(i, text)}
            placeholder={`Jugador ${i + 1}`}
            placeholderTextColor="#666"
            maxLength={16}
          />
        ))}
      </View>

      <Pressable style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startBtnText}>Empezar partida</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  backText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
    marginBottom: 20,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 28,
  },
  counterBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnDisabled: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  counterBtnText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  count: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
    minWidth: 60,
    textAlign: 'center',
  },
  namesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  namesList: {
    gap: 10,
    flex: 1,
  },
  nameInput: {
    backgroundColor: '#252540',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  startBtn: {
    backgroundColor: '#43A047',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginVertical: 20,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});
