import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props {
  onDuel: () => void;
  onVariety: () => void;
  onMulti: () => void;
}

interface ModeCardProps {
  emoji: string;
  title: string;
  desc: string;
  accentColor: string;
  bgColor: string;
  onPress: () => void;
}

function ModeCard({ emoji, title, desc, accentColor, bgColor, onPress }: ModeCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.modeCard,
        { backgroundColor: bgColor, borderColor: accentColor },
        pressed && styles.modeCardPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.modeCardRow}>
        <View style={[styles.emojiWrap, { backgroundColor: accentColor + '22' }]}>
          <Text style={styles.modeEmoji}>{emoji}</Text>
        </View>
        <View style={styles.modeText}>
          <Text style={[styles.modeTitle, { color: accentColor }]}>{title}</Text>
          <Text style={styles.modeDesc}>{desc}</Text>
        </View>
        <Text style={[styles.arrow, { color: accentColor + '99' }]}>›</Text>
      </View>
    </Pressable>
  );
}

export function HomeScreen({ onDuel, onVariety, onMulti }: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* header */}
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>UNO</Text>
        </View>
        <Text style={styles.appName}>Gym Cards</Text>
        <Text style={styles.subtitle}>
          Sacad cartas al azar · haced flexiones · alternaos
        </Text>
      </View>

      {/* divider label */}
      <View style={styles.sectionRow}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionLabel}>ELIGE MODO</Text>
        <View style={styles.sectionLine} />
      </View>

      <ModeCard
        emoji="⚔️"
        title="1 vs 1 Tradicional"
        desc="Uno u otro, siempre. Sin empates ni comodines raros."
        accentColor="#E53935"
        bgColor="#1e0f0f"
        onPress={onDuel}
      />

      <ModeCard
        emoji="🎲"
        title="Variedad 2 jugadores"
        desc="Los dos, elige quién, comodín… reglas más variadas en pareja."
        accentColor="#FDD835"
        bgColor="#1e1b0f"
        onPress={onVariety}
      />

      <ModeCard
        emoji="👥"
        title="Multijugador"
        desc="De 2 a 6 jugadores. Pon los nombres y a repartir."
        accentColor="#1E88E5"
        bgColor="#0f161e"
        onPress={onMulti}
      />

      <Text style={styles.footer}>108 cartas · mazo oficial UNO</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    gap: 12,
  },

  /* header */
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  logoBadge: {
    backgroundColor: '#E53935',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 14,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* section divider */
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#222',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#444',
    letterSpacing: 2,
  },

  /* mode cards */
  modeCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
  },
  modeCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  modeCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeEmoji: {
    fontSize: 26,
  },
  modeText: {
    flex: 1,
    gap: 3,
  },
  modeTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  modeDesc: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 28,
    fontWeight: '300',
    marginRight: 2,
  },

  /* footer note */
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});
