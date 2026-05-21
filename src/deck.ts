import { CardColor, CardValue, UnoCard } from './types';

const NUMBER_VALUES: CardValue[] = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

const ACTION_VALUES: CardValue[] = ['skip', 'reverse', 'draw2'];

const COLORS: CardColor[] = ['red', 'blue', 'green', 'yellow'];

function addNumberCards(cards: UnoCard[], color: CardColor, startId: number): number {
  let id = startId;
  for (const value of NUMBER_VALUES) {
    const count = value === '0' ? 1 : 2;
    for (let i = 0; i < count; i++) {
      cards.push({ id: String(id++), color, value });
    }
  }
  return id;
}

function addActionCards(cards: UnoCard[], color: CardColor, startId: number): number {
  let id = startId;
  for (const value of ACTION_VALUES) {
    for (let i = 0; i < 2; i++) {
      cards.push({ id: String(id++), color, value });
    }
  }
  return id;
}

export function createFullDeck(): UnoCard[] {
  const cards: UnoCard[] = [];
  let id = 0;

  for (const color of COLORS) {
    id = addNumberCards(cards, color, id);
    id = addActionCards(cards, color, id);
  }

  for (let i = 0; i < 4; i++) {
    cards.push({ id: String(id++), color: 'wild', value: 'wild' });
    cards.push({ id: String(id++), color: 'wild', value: 'wild4' });
  }

  return cards;
}

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export class CardBag {
  private pile: UnoCard[] = [];

  constructor() {
    this.refill();
  }

  refill(): void {
    this.pile = shuffle(createFullDeck());
  }

  draw(): UnoCard {
    if (this.pile.length === 0) {
      this.refill();
    }
    return this.pile.pop()!;
  }

  get remaining(): number {
    return this.pile.length;
  }
}
