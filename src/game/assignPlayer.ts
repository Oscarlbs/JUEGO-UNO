import { CardColor, CardValue, UnoCard } from '../types';
import { GameConfig } from './config';

const COLOR_ORDER: CardColor[] = ['red', 'blue', 'green', 'yellow'];
const PALETTE = ['#E53935', '#1E88E5', '#43A047', '#FDD835'];

function isNumberValue(value: CardValue): boolean {
  return value >= '0' && value <= '9';
}

function playerFromIndex(config: GameConfig, index: number): string {
  return config.players[index % config.players.length];
}

/** 1v1 estricto: siempre uno u otro, sin "los dos" ni "elige". */
function assignDuel(config: GameConfig, card: UnoCard): CardAssignment {
  const [p1, p2] = config.players;

  if (card.color === 'wild') {
    const player = card.value === 'wild4' ? p2 : p1;
    return { hint: player, playerName: player };
  }

  const colorMap: Record<CardColor, string> = {
    red: p1,
    blue: p2,
    green: p1,
    yellow: p2,
    wild: p1,
  };

  const player = colorMap[card.color];
  return { hint: player, playerName: player };
}

/** 2 jugadores con reglas variadas: los dos, elige, comodín, etc. */
function assignVariety(config: GameConfig, card: UnoCard): CardAssignment {
  const [p1, p2] = config.players;

  if (card.color === 'wild') {
    return {
      hint: 'Elige color → elige quién flexiona (o lo que queráis)',
      playerName: null,
    };
  }

  if (card.color === 'green') {
    return {
      hint: '¡Los dos! 5 flexiones cada uno (o lo que acordéis)',
      playerName: null,
    };
  }

  if (card.color === 'yellow') {
    return {
      hint: 'Elige quién flexiona — o inventad la regla',
      playerName: null,
    };
  }

  if (card.value === 'skip') {
    return {
      hint: `${p2} se salta · ${p1} hace las flexiones`,
      playerName: p1,
    };
  }

  if (card.value === 'reverse') {
    return {
      hint: 'Cambio de turno · elige quién flexiona',
      playerName: null,
    };
  }

  if (card.value === 'draw2') {
    return {
      hint: `${p2} hace el doble de flexiones`,
      playerName: p2,
    };
  }

  if (isNumberValue(card.value)) {
    const num = parseInt(card.value, 10);
    const player = num % 2 === 0 ? p1 : p2;
    return {
      hint: `${player} hace ${num} flexiones`,
      playerName: player,
    };
  }

  const player = card.color === 'red' ? p1 : p2;
  return { hint: `${player} hace las flexiones`, playerName: player };
}

function assignMulti(config: GameConfig, card: UnoCard): CardAssignment {
  const count = config.players.length;

  if (card.color === 'wild') {
    return {
      hint: 'Elige color → elige quién flexiona',
      playerName: null,
    };
  }

  if (card.color === 'yellow' && count <= 4) {
    const p = config.players[3];
    if (p) {
      return { hint: `${p} hace las flexiones`, playerName: p };
    }
  }

  if (count > 4 && isNumberValue(card.value)) {
    const num = parseInt(card.value, 10);
    const player = playerFromIndex(config, num % count);
    return {
      hint: `${player} hace las flexiones (${num})`,
      playerName: player,
    };
  }

  const colorIndex = COLOR_ORDER.indexOf(card.color);
  if (colorIndex >= 0 && colorIndex < count) {
    const player = config.players[colorIndex];
    return { hint: `${player} hace las flexiones`, playerName: player };
  }

  return {
    hint: 'Quien sacó la carta elige quién flexiona',
    playerName: null,
  };
}

export interface CardAssignment {
  hint: string;
  playerName: string | null;
}

export function assignCard(config: GameConfig, card: UnoCard): CardAssignment {
  switch (config.mode) {
    case 'duel':
      return assignDuel(config, card);
    case 'variety':
      return assignVariety(config, card);
    case 'multi':
      return assignMulti(config, card);
  }
}

export function getLegendItems(config: GameConfig): { color: string; label: string }[] {
  const [p1, p2] = config.players;

  if (config.mode === 'duel') {
    return [
      { color: PALETTE[0], label: `Rojo = ${p1}` },
      { color: PALETTE[1], label: `Azul = ${p2}` },
      { color: PALETTE[2], label: `Verde = ${p1}` },
      { color: PALETTE[3], label: `Amarillo = ${p2}` },
      { color: '#212121', label: `Comodín = ${p1} · +4 = ${p2}` },
    ];
  }

  if (config.mode === 'variety') {
    return [
      { color: PALETTE[0], label: `Rojo = ${p1}` },
      { color: PALETTE[1], label: `Azul = ${p2}` },
      { color: PALETTE[2], label: 'Verde = los dos' },
      { color: PALETTE[3], label: 'Amarillo = elige' },
      { color: '#212121', label: 'Comodín = lo que queráis' },
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
    items.push({
      color: '#888',
      label: `Números reparten entre ${config.players.length} jugadores`,
    });
  }

  items.push({ color: '#212121', label: 'Comodín = elige' });
  return items;
}
