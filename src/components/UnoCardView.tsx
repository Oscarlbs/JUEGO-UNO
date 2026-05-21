import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UnoCard } from '../types';
import { COLOR_LABELS, VALUE_LABELS } from '../cardLabels';
import { CARD_COLORS, CARD_TEXT_ON } from '../theme';

interface Props {
  card: UnoCard | null;
  onPress: () => void;
}

function WildDots() {
  const dots = ['#E53935', '#1E88E5', '#43A047', '#FDD835'] as const;
  return (
    <View style={styles.wildDots}>
      {dots.map((c, i) => (
        <View key={i} style={[styles.dot, { backgroundColor: c }]} />
      ))}
    </View>
  );
}

function CardSymbol({ card }: { card: UnoCard }) {
  if (card.value === 'wild' || card.value === 'wild4') return <WildDots />;
  if (card.value === 'skip')    return <Text style={styles.symbol}>⊘</Text>;
  if (card.value === 'reverse') return <Text style={styles.symbol}>⇄</Text>;
  if (card.value === 'draw2')   return <Text style={styles.symbol}>+2</Text>;
  return <Text style={styles.symbol}>{VALUE_LABELS[card.value]}</Text>;
}

export function UnoCardView({ card, onPress }: Props) {
  if (!card) {
    return (
      <Pressable style={styles.placeholder} onPress={onPress}>
        {/* card-back pattern */}
        <View style={styles.backOval}>
          <Text style={styles.backOvalText}>UNO</Text>
        </View>
        <Text style={styles.placeholderHint}>Toca para sacar carta</Text>
      </Pressable>
    );
  }

  const bg     = CARD_COLORS[card.color];
  const fg     = CARD_TEXT_ON[card.color];
  const isWild = card.color === 'wild';
  const label  = VALUE_LABELS[card.value];

  return (
    <Pressable
      style={[styles.card, { backgroundColor: bg }]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
    >
      {/* top-left corner */}
      <View style={[styles.corner, styles.topLeft]}>
        <Text style={[styles.cornerValue, { color: fg }]}>{label}</Text>
      </View>

      {/* center oval  */}
      <View style={styles.centerOvalWrap}>
        <View style={[styles.centerOval, { borderColor: fg + '40' }]}>
          <CardSymbol card={card} />
          {isWild && (
            <Text style={[styles.wildLabel, { color: fg }]}>
              {card.value === 'wild4' ? '+4' : 'WILD'}
            </Text>
          )}
        </View>
      </View>

      {/* bottom-right corner (rotated) */}
      <View style={[styles.corner, styles.bottomRight]}>
        <Text style={[styles.cornerValue, { color: fg }]}>{label}</Text>
      </View>

      {/* UNO watermark */}
      <View style={styles.unoBadge}>
        <Text style={[styles.unoBadgeText, { color: fg }]}>UNO</Text>
      </View>
    </Pressable>
  );
}

export function CardInfoBar({ card }: { card: UnoCard | null }) {
  if (!card) return null;
  return (
    <View style={styles.infoBar}>
      <View style={styles.infoChip}>
        <Text style={styles.infoChipText}>
          {COLOR_LABELS[card.color]}  ·  {VALUE_LABELS[card.value]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ── placeholder ── */
  placeholder: {
    width: '88%',
    aspectRatio: 0.68,
    maxHeight: '68%',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#16162a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  },
  backOval: {
    width: 140,
    height: 200,
    borderRadius: 70,
    backgroundColor: '#E53935',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-25deg' }],
  },
  backOvalText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
    transform: [{ rotate: '25deg' }],
  },
  placeholderHint: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
  },

  /* ── card ── */
  card: {
    width: '88%',
    aspectRatio: 0.68,
    maxHeight: '68%',
    borderRadius: 28,
    borderWidth: 5,
    borderColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 16,
  },
  corner: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  topLeft:     { top: 0, left: 0 },
  bottomRight: { bottom: 0, right: 0, transform: [{ rotate: '180deg' }] },
  cornerValue: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 36,
  },
  centerOvalWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOval: {
    width: '68%',
    aspectRatio: 0.62,
    borderRadius: 999,
    borderWidth: 3,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    transform: [{ rotate: '-20deg' }],
  },
  symbol: {
    fontSize: 100,
    fontWeight: '900',
    color: '#fff',
    transform: [{ rotate: '20deg' }],
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  wildDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 110,
    justifyContent: 'center',
    gap: 10,
    transform: [{ rotate: '20deg' }],
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  wildLabel: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 3,
    transform: [{ rotate: '20deg' }],
  },
  unoBadge: {
    position: 'absolute',
    bottom: 48,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.22)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
    transform: [{ rotate: '-10deg' }],
  },
  unoBadgeText: {
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 1,
    opacity: 0.85,
  },

  /* ── info bar ── */
  infoBar: {
    marginTop: 16,
    alignItems: 'center',
  },
  infoChip: {
    backgroundColor: '#1e1e35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoChipText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ccc',
    letterSpacing: 0.5,
  },
});
