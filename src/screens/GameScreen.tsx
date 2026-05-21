import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { assignCard, getLegendItems } from '../game/assignPlayer';
import { GameConfig, MODE_LABELS } from '../game/config';
import { CardBag } from '../deck';
import { UnoCard } from '../types';
import { getJoke, getMilestoneJoke } from '../jokes';
import { playCardFlip, initCardSound } from '../sounds/cardSound';
import { CardInfoBar, UnoCardView } from '../components/UnoCardView';

const PLAYER_COLORS = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#AB47BC', '#FF7043'];

interface Props {
  config: GameConfig;
  onBack: () => void;
}

export function GameScreen({ config, onBack }: Props) {
  const bag       = useRef(new CardBag()).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [card,      setCard]      = useState<UnoCard | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const [joke,      setJoke]      = useState<string>('');

  const isDuel = config.mode === 'duel';

  useEffect(() => { initCardSound(); }, []);

  const assignment = useMemo(
    () => (card ? assignCard(config, card) : null),
    [card, config],
  );

  const legend = useMemo(() => getLegendItems(config), [config]);

  const modeLabel =
    config.mode === 'multi'
      ? `${config.players.length} jugadores`
      : MODE_LABELS[config.mode];

  const animateCard = () => {
    scaleAnim.setValue(0.88);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 28,
      bounciness: 10,
    }).start();
  };

  const drawCard = useCallback(async () => {
    const next = bag.draw();
    await playCardFlip(next.value);
    const newCount   = drawCount + 1;
    const player     = assignment?.playerName ?? config.players[0];
    const other      = config.players.find((p) => p !== player) ?? config.players[1] ?? '';

    const milestone = getMilestoneJoke(newCount);
    const cardJoke  = getJoke(next.value, player, other);
    setJoke(milestone ?? cardJoke);

    animateCard();
    setCard(next);
    setDrawCount(newCount);
  }, [bag, drawCount, assignment, config.players]);

  const hint = isDuel
    ? (assignment?.hint ?? 'Toca la carta')
    : (assignment?.hint ?? 'Toca para sacar carta');

  return (
    <View style={styles.container}>
      {/* ── top bar ── */}
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Menú</Text>
        </Pressable>
        <View style={styles.modePill}>
          <Text style={styles.modePillText}>{modeLabel}</Text>
        </View>
        <View style={styles.countWrap}>
          <Text style={styles.countNum}>{drawCount}</Text>
          <Text style={styles.countLabel}>cartas</Text>
        </View>
      </View>

      {/* ── players row (non-duel) ── */}
      {!isDuel && (
        <View style={styles.playersRow}>
          {config.players.map((name, i) => (
            <View key={i} style={[styles.playerChip, { borderColor: PLAYER_COLORS[i] + '99' }]}>
              <View style={[styles.playerDot, { backgroundColor: PLAYER_COLORS[i] }]} />
              <Text style={styles.playerName} numberOfLines={1}>{name}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ── duel: player chips siempre visibles ── */}
      {isDuel && (
        <View style={styles.duelPlayers}>
          {config.players.map((name, i) => (
            <View
              key={i}
              style={[
                styles.duelChip,
                { borderColor: PLAYER_COLORS[i] },
                assignment?.playerName === name && styles.duelChipActive,
                assignment?.playerName === name && { backgroundColor: PLAYER_COLORS[i] + '22' },
              ]}
            >
              <Text
                style={[
                  styles.duelChipText,
                  assignment?.playerName === name && { color: PLAYER_COLORS[i] },
                ]}
                numberOfLines={1}
              >
                {name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ── card ── */}
      <View style={styles.cardArea}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%', alignItems: 'center' }}>
          <UnoCardView card={card} onPress={drawCard} />
        </Animated.View>
        {!isDuel && <CardInfoBar card={card} />}
      </View>

      {/* ── footer ── */}
      <View style={[styles.footer, isDuel && styles.footerDuel]}>
        {isDuel ? (
          card ? (
            <View style={styles.duelResult}>
              <Text style={styles.duelName}>{hint}</Text>
              <View style={[styles.duelBadge, { backgroundColor: PLAYER_COLORS[config.players.indexOf(assignment?.playerName ?? '')] ?? '#E53935' }]}>
                <Text style={styles.duelBadgeText}>FLEXIONA</Text>
              </View>
              {joke ? <Text style={styles.jokeText}>💬 {joke}</Text> : null}
            </View>
          ) : (
            <Text style={styles.idleText}>Toca la carta para empezar</Text>
          )
        ) : (
          <>
            <Text style={styles.hint}>{hint}</Text>
            {joke ? <Text style={styles.jokeText}>💬 {joke}</Text> : null}
            <View style={styles.legend}>
              {legend.map((item, i) => (
                <View key={i} style={[styles.legendItem, { borderColor: item.color + '55' }]}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* top bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 4,
  },
  backBtn: { paddingVertical: 8, paddingRight: 10, minWidth: 64 },
  backText: { color: '#444', fontSize: 15, fontWeight: '600' },
  modePill: {
    backgroundColor: '#16162e',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#252550',
  },
  modePillText: { color: '#FDD835', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  countWrap: { alignItems: 'flex-end', minWidth: 64 },
  countNum:  { color: '#fff', fontSize: 18, fontWeight: '900', lineHeight: 20 },
  countLabel:{ color: '#333', fontSize: 10, fontWeight: '600', letterSpacing: 1 },

  /* duel player chips */
  duelPlayers: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 2,
  },
  duelChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#222',
    backgroundColor: '#111128',
    maxWidth: 160,
  },
  duelChipActive: {
    borderWidth: 2,
  },
  duelChipText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '800',
  },

  /* multi player chips */
  playersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 2,
  },
  playerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#111128',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  playerDot:  { width: 8, height: 8, borderRadius: 4 },
  playerName: { color: '#bbb', fontSize: 12, fontWeight: '700', maxWidth: 90 },

  /* card */
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* footer */
  footer:     { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  footerDuel: { paddingBottom: 20 },

  hint: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDD835',
    textAlign: 'center',
    lineHeight: 22,
  },

  /* duel result */
  duelResult: { alignItems: 'center', gap: 8 },
  duelName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  duelBadge: {
    paddingHorizontal: 28,
    paddingVertical: 9,
    borderRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  duelBadgeText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
  },

  idleText: { fontSize: 16, color: '#333', textAlign: 'center', fontWeight: '600' },

  /* joke */
  jokeText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
    paddingHorizontal: 8,
  },

  /* legend */
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#111128',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  legendDot:  { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11, color: '#888', fontWeight: '600' },
});
