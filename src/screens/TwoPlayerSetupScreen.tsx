import { useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GameMode } from '../game/config';

interface Props {
  mode: GameMode;
  onStart: (p1: string, p2: string) => void;
  onBack: () => void;
}

const MODE_META: Record<string, { title: string; subtitle: string; color: string }> = {
  duel: {
    title: '1 vs 1 Tradicional',
    subtitle: 'Siempre uno u otro. Sin rodeos.',
    color: '#E53935',
  },
  variety: {
    title: 'Variedad',
    subtitle: 'Los dos, elige quién, comodín… ¡a improvisar!',
    color: '#FDD835',
  },
};

export function TwoPlayerSetupScreen({ mode, onStart, onBack }: Props) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const ref2 = useRef<TextInput>(null);
  const meta = MODE_META[mode] ?? MODE_META.duel;

  const handleStart = () => {
    Keyboard.dismiss();
    onStart(p1.trim() || 'Jugador 1', p2.trim() || 'Jugador 2');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        {/* top bar */}
        <View style={styles.topBar}>
          <Pressable onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>← Volver</Text>
          </Pressable>
        </View>

        <View style={styles.body}>
          {/* header */}
          <View style={styles.header}>
            <View style={[styles.modePill, { backgroundColor: meta.color + '22', borderColor: meta.color + '66' }]}>
              <Text style={[styles.modePillText, { color: meta.color }]}>{meta.title}</Text>
            </View>
            <Text style={styles.title}>¿Cómo os llamáis?</Text>
            <Text style={styles.subtitle}>{meta.subtitle}</Text>
          </View>

          {/* inputs */}
          <View style={styles.inputs}>
            <View style={styles.inputRow}>
              <View style={[styles.colorBar, { backgroundColor: '#E53935' }]} />
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>JUGADOR 1</Text>
                <TextInput
                  style={styles.input}
                  value={p1}
                  onChangeText={setP1}
                  placeholder="Ej: Oscar"
                  placeholderTextColor="#333"
                  maxLength={16}
                  returnKeyType="next"
                  onSubmitEditing={() => ref2.current?.focus()}
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.vsRow}>
              <View style={styles.vsDivider} />
              <Text style={styles.vs}>VS</Text>
              <View style={styles.vsDivider} />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.colorBar, { backgroundColor: '#1E88E5' }]} />
              <View style={styles.inputWrap}>
                <Text style={styles.inputLabel}>JUGADOR 2</Text>
                <TextInput
                  ref={ref2}
                  style={styles.input}
                  value={p2}
                  onChangeText={setP2}
                  placeholder="Ej: Amigo"
                  placeholderTextColor="#333"
                  maxLength={16}
                  returnKeyType="done"
                  onSubmitEditing={handleStart}
                />
              </View>
            </View>
          </View>

          {/* start */}
          <Pressable
            style={({ pressed }) => [styles.startBtn, pressed && { opacity: 0.85 }]}
            onPress={handleStart}
          >
            <Text style={styles.startBtnText}>¡A flexionar!  →</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  backBtn: { paddingVertical: 8, paddingRight: 12 },
  backText: { color: '#555', fontSize: 15, fontWeight: '600' },

  body: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 32,
  },

  header: { alignItems: 'center', gap: 10 },
  modePill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  modePillText: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

  inputs: { gap: 0 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#111128',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e1e40',
  },
  colorBar: { width: 5 },
  inputWrap: { flex: 1, padding: 16, gap: 4 },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#444',
    letterSpacing: 2,
  },
  input: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    padding: 0,
  },

  vsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 12,
  },
  vsDivider: { flex: 1, height: 1, backgroundColor: '#1e1e40' },
  vs: {
    fontSize: 13,
    fontWeight: '900',
    color: '#333',
    letterSpacing: 3,
  },

  startBtn: {
    backgroundColor: '#E53935',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  startBtnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
