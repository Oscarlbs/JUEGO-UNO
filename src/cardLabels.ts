import { CardColor, CardValue } from './types';

export const COLOR_LABELS: Record<CardColor, string> = {
  red: 'Rojo',
  blue: 'Azul',
  green: 'Verde',
  yellow: 'Amarillo',
  wild: 'Comodín',
};

export const VALUE_LABELS: Record<CardValue, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  skip: 'Salta',
  reverse: 'Reversa',
  draw2: '+2',
  wild: 'Cambio',
  wild4: '+4',
};

/** Colores → jugador sugerido para alternar flexiones */
export const GYM_HINT: Record<CardColor, string> = {
  red: 'Tú haces las flexiones',
  blue: 'Tu amigo hace las flexiones',
  green: 'Los dos: 5 flexiones',
  yellow: 'El que sacó la carta elige',
  wild: 'Elige color = elige quién flexiona',
};
