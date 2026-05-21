import { CardColor, CardValue, UnoCard } from '../types';
import { GameConfig } from './config';

const COLOR_ORDER: CardColor[] = ['red', 'blue', 'green', 'yellow'];
const PALETTE = ['#E53935', '#1E88E5', '#43A047', '#FDD835'];

function isNumberValue(value: CardValue): boolean {
  return value >= '0' && value <= '9';
}

function isActionValue(value: CardValue): boolean {
  return value === 'skip' || value === 'reverse' || value === 'draw2';
}

function playerFromIndex(config: GameConfig, index: number): string {
  return config.players[index % config.players.length];
}

/**
 * En UNO las cartas de acción (Salta, Reversa, +2) las juegas TÚ
 * sobre tu RIVAL — así que el rival es el afectado.
 * El color del dueño nos dice quién "juega" la carta;
 * las acciones siempre van al jugador contrario a ese color.
 */

// ─── 1 vs 1 TRADICIONAL ───────────────────────────────────────────────────────

function assignDuel(config: GameConfig, card: UnoCard): CardAssignment {
  const [p1, p2] = config.players;

  if (card.color === 'wild') {
    // Comodín: lo juega p1; +4: lo juega p1 sobre p2 → p2 flexiona
    const player = card.value === 'wild4' ? p2 : p1;
    return { hint: player, playerName: player };
  }

  // Quién "posee" este color (quien jugaría la carta)
  const colorOwner: Record<CardColor, string> = {
    red:    p1,
    blue:   p2,
    green:  p1,
    yellow: p2,
    wild:   p1,
  };
  const owner    = colorOwner[card.color];
  const opponent = owner === p1 ? p2 : p1;

  if (isActionValue(card.value)) {
    // La acción va al rival del dueño del color
    return { hint: opponent, playerName: opponent };
  }

  // Números → flexiona el dueño del color
  return { hint: owner, playerName: owner };
}

// ─── VARIEDAD (2 jugadores) ───────────────────────────────────────────────────

function assignVariety(config: GameConfig, card: UnoCard): CardAssignment {
  const [p1, p2] = config.players;

  if (card.color === 'wild') {
    return {
      hint: 'Elige color → elige quién flexiona',
      playerName: null,
    };
  }

  if (card.color === 'green') {
    return {
      hint: '¡Los dos! Las flexiones que acordéis',
      playerName: null,
    };
  }

  if (card.color === 'yellow') {
    return {
      hint: 'Elige quién flexiona — o inventad la regla',
      playerName: null,
    };
  }

  // Dueño del color en rojo/azul
  const owner    = card.color === 'red' ? p1 : p2;
  const opponent = owner === p1 ? p2 : p1;

  if (card.value === 'skip') {
    // El dueño cancela al rival → el rival (saltado) flexiona
    return {
      hint: `¡${owner} cancela a ${opponent}! → ${opponent} flexiona`,
      playerName: opponent,
    };
  }

  if (card.value === 'reverse') {
    // El dueño cambia el sentido: le toca de nuevo → el rival flexiona
    return {
      hint: `¡${owner} cambia el sentido! → ${opponent} flexiona`,
      playerName: opponent,
    };
  }

  if (card.value === 'draw2') {
    // El dueño da +2 al rival → el rival flexiona (2 extra)
    return {
      hint: `¡${owner} da +2 a ${opponent}! → ${opponent} hace 2 flexiones`,
      playerName: opponent,
    };
  }

  if (isNumberValue(card.value)) {
    const num = parseInt(card.value, 10);
    const player = num % 2 === 0 ? p1 : p2;
    return {
      hint: `${player} hace ${num === 0 ? '10' : String(num)} flexiones`,
      playerName: player,
    };
  }

  return { hint: `${owner} hace las flexiones`, playerName: owner };
}

// ─── MULTIJUGADOR ─────────────────────────────────────────────────────────────

function assignMulti(config: GameConfig, card: UnoCard): CardAssignment {
  const count = config.players.length;

  if (card.color === 'wild') {
    return {
      hint: 'Elige color → elige quién flexiona',
      playerName: null,
    };
  }

  const colorIndex = COLOR_ORDER.indexOf(card.color);

  if (isActionValue(card.value)) {
    // Acción → jugador SIGUIENTE al del color (el que es "atacado")
    const targetIndex = (colorIndex + 1) % count;
    const target = playerFromIndex(config, targetIndex);

    const actionLabel: Record<CardValue, string> = {
      skip:    `¡Salta! → ${target} flexiona`,
      reverse: `¡Reversa! → ${target} flexiona`,
      draw2:   `¡+2! → ${target} hace 2 flexiones`,
      wild: '', wild4: '', '0': '', '1': '', '2': '', '3': '',
      '4': '', '5': '', '6': '', '7': '', '8': '', '9': '',
    };

    return {
      hint: actionLabel[card.value] || `${target} flexiona`,
      playerName: target,
    };
  }

  if (count > 4 && isNumberValue(card.value)) {
    const num = parseInt(card.value, 10);
    const player = playerFromIndex(config, num % count);
    return {
      hint: `${player} hace las flexiones`,
      playerName: player,
    };
  }

  if (colorIndex >= 0 && colorIndex < count) {
    const player = config.players[colorIndex];
    return { hint: `${player} hace las flexiones`, playerName: player };
  }

  return {
    hint: 'Quien sacó la carta elige quién flexiona',
    playerName: null,
  };
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export interface CardAssignment {
  hint: string;
  playerName: string | null;
}

export function assignCard(config: GameConfig, card: UnoCard): CardAssignment {
  switch (config.mode) {
    case 'duel':    return assignDuel(config, card);
    case 'variety': return assignVariety(config, card);
    case 'multi':   return assignMulti(config, card);
  }
}

export function getLegendItems(config: GameConfig): { color: string; label: string }[] {
  const [p1, p2] = config.players;

  if (config.mode === 'duel') {
    return [
      { color: PALETTE[0], label: `Rojo núm. = ${p1}` },
      { color: PALETTE[1], label: `Azul núm. = ${p2}` },
      { color: PALETTE[2], label: `Verde núm. = ${p1}` },
      { color: PALETTE[3], label: `Amarillo núm. = ${p2}` },
      { color: '#888',     label: 'Acción → rival del color' },
      { color: '#212121',  label: `Comodín = ${p1} · +4 = ${p2}` },
    ];
  }

  if (config.mode === 'variety') {
    return [
      { color: PALETTE[0], label: `Rojo núm. = ${p1}` },
      { color: PALETTE[1], label: `Azul núm. = ${p2}` },
      { color: PALETTE[2], label: 'Verde = los dos' },
      { color: PALETTE[3], label: 'Amarillo = elige' },
      { color: '#888',     label: 'Acción → rival del color' },
      { color: '#212121',  label: 'Comodín = elige' },
    ];
  }

  const items: { color: string; label: string }[] = [];
  config.players.forEach((name, i) => {
    if (i < 4) {
      items.push({
        color: PALETTE[i],
        label: `${name} (${['Rojo', 'Azul', 'Verde', 'Amarillo'][i]})`,
      });
    }
  });
  if (config.players.length > 4) {
    items.push({ color: '#888', label: `Números reparten entre ${config.players.length}` });
  }
  items.push({ color: '#888',    label: 'Acción → siguiente jugador' });
  items.push({ color: '#212121', label: 'Comodín = elige' });
  return items;
}
