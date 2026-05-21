export type GameMode = 'duel' | 'variety' | 'multi';

export interface GameConfig {
  mode: GameMode;
  players: string[];
}

export const DUEL_CONFIG: GameConfig = {
  mode: 'duel',
  players: ['Jugador 1', 'Jugador 2'],
};

export const VARIETY_CONFIG: GameConfig = {
  mode: 'variety',
  players: ['Jugador 1', 'Jugador 2'],
};

export function createMultiConfig(count: number): GameConfig {
  const safeCount = Math.min(6, Math.max(2, count));
  return {
    mode: 'multi',
    players: Array.from({ length: safeCount }, (_, i) => `Jugador ${i + 1}`),
  };
}

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export const MODE_LABELS: Record<GameMode, string> = {
  duel: '1 vs 1 Tradicional',
  variety: 'Variedad (2 jugadores)',
  multi: 'Multijugador',
};
