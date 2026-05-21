import * as Haptics from 'expo-haptics';
import { CardValue } from '../types';

/**
 * Feedback táctil diferenciado por tipo de carta.
 * En iPhone el Taptic Engine hace sonido audible junto con la vibración.
 */
export async function playCardFlip(value?: CardValue): Promise<void> {
  if (value === 'wild' || value === 'wild4') {
    // Comodín: triple golpe
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await delay(80);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await delay(80);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    return;
  }

  if (value === 'draw2') {
    // +2: doble golpe fuerte
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await delay(90);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    return;
  }

  if (value === 'skip' || value === 'reverse') {
    // Acción: golpe fuerte + leve
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    return;
  }

  // Número: golpe único sólido
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}

// initCardSound ya no hace falta pero se exporta para no romper imports
export async function initCardSound(): Promise<void> {}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
