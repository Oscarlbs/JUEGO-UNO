import { useState } from 'react';
import {
  Pressable,
  ScrollView,
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

const PLAYER_COLORS = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#AB47BC', '#FF7043'];

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
    <View style={styles.root}>
      {/* top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Volver</Text>
        </Pressable>
        <Text style={styles.topTitle}>Multijugador</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* counter */}
        <View style={styles.counterCard}>
          <Text style={styles.counterLabel}>¿Cuántos jugáis?</Text>
          <View style={styles.counterRow}>
            <Pressable
              style={[styles.counterBtn, count <= MIN_PLAYERS && styles.counterBtnOff]}
              onPress={() => setPlayerCount(count - 1)}
              disabled={count <= MIN_PLAYERS}
            >
              <Text style={styles.counterBtnText}>−</Text>
            </Pressable>
            <Text style={styles.countNumber}>{count}</Text>
            <Pressable
              style={[styles.counterBtn, count >= MAX_PLAYERS && styles.counterBtnOff]}
              onPress={() => setPlayerCount(count + 1)}
              disabled={count >= MAX_PLAYERS}
            >
              <Text style={styles.counterBtnText}>+</Text>
            </Pressable>
          </View>
          {/* player dots preview */}
          <View style={styles.dotsRow}>
            {Array.from({ length: MAX_PLAYERS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i < count
                    ? { backgroundColor: PLAYER_COLORS[i] }
                    : styles.dotOff,
                ]}
              />
            ))}
          </View>
        </View>

        {/* names */}
        <Text style={styles.namesLabel}>Nombres (opcional)</Text>
        <View style={styles.namesList}>
          {names.map((name, i) => (
            <View key={i} style={styles.nameRow}>
              <View style={[styles.nameColor, { backgroundColor: PLAYER_COLORS[i] }]} />
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={(text) => updateName(i, text)}
                placeholder={`Jugador ${i + 1}`}
                placeholderTextColor="#444"
                maxLength={16}
                returnKeyType="next"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.startBtn} onPress={handleStart}>
          <Text style={styles.startBtnText}>Empezar  →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 70,
  },
  backText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 20,
  },

  /* counter */
  counterCard: {
    backgroundColor: '#13132a',
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E88E5' + '55',
    gap: 16,
  },
  counterLabel: {
    fontSize: 15,
    color: '#888',
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  counterBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  counterBtnOff: {
    backgroundColor: '#222',
    shadowOpacity: 0,
    elevation: 0,
  },
  counterBtnText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 30,
  },
  countNumber: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    minWidth: 64,
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dotOff: {
    backgroundColor: '#222',
  },

  /* names */
  namesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  namesList: {
    gap: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameColor: {
    width: 6,
    height: 42,
    borderRadius: 3,
  },
  nameInput: {
    flex: 1,
    backgroundColor: '#13132a',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#252545',
  },

  /* bottom */
  bottomBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
  startBtn: {
    backgroundColor: '#43A047',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#43A047',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
});
