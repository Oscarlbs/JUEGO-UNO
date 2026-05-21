import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CardBag } from '../deck';
import { UnoCard } from '../types';
import { assignCard, getLegendItems } from '../game/assignPlayer';
import { GameConfig, MODE_LABELS } from '../game/config';
import { CardInfoBar, UnoCardView } from '../components/UnoCardView';

interface Props {
  config: GameConfig;
  onBack: () => void;
}

export function GameScreen({ config, onBack }: Props) {
  const bag = useRef(new CardBag()).current;
  const [card, setCard] = useState<UnoCard | null>(null);
  const [drawCount, setDrawCount] = useState(0);

  const isDuel = config.mode === 'duel';

  const assignment = useMemo(
    () => (card ? assignCard(config, card) : null),
    [card, config],
  );

  const hint = isDuel
    ? (assignment?.hint ?? 'Toca la carta')
    : (assignment?.hint ?? 'Toca la carta para sacar la siguiente.');
  const legend = useMemo(() => getLegendItems(config), [config]);

  const modeLabel =
    config.mode === 'multi'
      ? `${MODE_LABELS.multi} · ${config.players.length}`
      : MODE_LABELS[config.mode];

  const drawCard = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCard(bag.draw());
    setDrawCount((c) => c + 1);
  }, [bag]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Menú</Text>
        </Pressable>
        <View style={styles.modeBadge}>
          <Text style={styles.modeBadgeText}>{modeLabel}</Text>
        </View>
      </View>

      {!isDuel && (
        <View style={styles.playersRow}>
          {config.players.map((name, i) => (
            <View key={i} style={styles.playerChip}>
              <Text style={styles.playerChipText} numberOfLines={1}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.cardArea}>
        <UnoCardView card={card} onPress={drawCard} />
        {!isDuel && <CardInfoBar card={card} />}
      </View>

      <View style={[styles.footer, isDuel && styles.footerDuel]}>
        {isDuel && card ? (
          <>
            <Text style={styles.hintDuel}>{assignment?.hint}</Text>
            <Text style={styles.duelAction}>flexiona</Text>
          </>
        ) : (
          <Text style={[styles.hint, isDuel && styles.hintDuel]}>{hint}</Text>
        )}
        {!isDuel && (
          <>
            <Text style={styles.stats}>
              Cartas: {drawCount}
              {bag.remaining > 0 ? ` · Quedan ${bag.remaining}` : ''}
            </Text>
            <View style={styles.legend}>
              {legend.map((item, i) => (
                <View key={i} style={styles.legendItem}>
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
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  backBtn: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '600',
  },
  modeBadge: {
    backgroundColor: '#252540',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modeBadgeText: {
    color: '#FDD835',
    fontSize: 13,
    fontWeight: '800',
  },
  playersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'center',
  },
  playerChip: {
    backgroundColor: '#252540',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    maxWidth: 120,
  },
  playerChipText: {
    color: '#ccc',
    fontSize: 13,
    fontWeight: '700',
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  footerDuel: {
    paddingBottom: 28,
    gap: 0,
  },
  hint: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDD835',
    textAlign: 'center',
    lineHeight: 26,
  },
  hintDuel: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    color: '#fff',
  },
  duelAction: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FDD835',
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  stats: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#252540',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  legendText: {
    fontSize: 11,
    color: '#ccc',
    fontWeight: '600',
  },
});
