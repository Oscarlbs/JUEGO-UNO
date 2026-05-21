import { CardValue } from './types';

type JokeList = string[];

// {p} = quien flexiona,  {o} = el otro jugador

const FLEX_JOKES: JokeList = [
  '¡{p}, esas flexiones no se hacen solas!',
  '¡Al suelo, {p}! Y no me refiero a rendirte...',
  '{p} se gana el físico hoy, señores.',
  'El cardio llama a {p}. ¿Descuelga?',
  'La carta ha hablado. {p} obedece.',
  '{p} demuestra que el gimnasio no fue solo para las fotos.',
  '¡Flexión, flexión! El músculo no espera, {p}.',
  'Los que te vean dirán: ¿de verdad se entrena con cartas de UNO?',
  'La próxima vez que {p} compre lotería, que lo piense dos veces.',
  '{p} lleva tantas que ya suda solo de mirarla.',
  '¡Venga {p}, que eso no pesa tanto como tu ego!',
  '{p} al tatami. El tatami se alegra.',
  'La gravedad ha elegido a {p} hoy. Qué detalle.',
  '¡{p} en modo bestia! O algo así.',
  'El mazo dice: {p} al suelo. El mazo no negocia.',
  '{p} tiene una cita con el suelo. Es formal.',
  '¡Vamos {p}! Que el dolor es temporal, las fotos duran para siempre.',
  'La carta roja de {p}. Roja como su cara en dos minutos.',
  '{p} demuestra hoy que los brazos no son de adorno.',
  '¡{p} al lío! Las flexiones se cuentan, las excusas no.',
];

const SKIP_JOKES: JokeList = [
  '¡Cancelado! Como los planes de hacer dieta en agosto.',
  '¡Salta! {p} tiene pase VIP esta ronda.',
  'El destino te ha dado una tarjeta gratis, {o}. Aprovéchala.',
  '¡{o} se libra! ¿O es que tiene contactos en el mazo?',
  'Se acabó el turno de {o}. Como el Wi‑Fi en el metro.',
  'La carta ha bendecido a {o}. Hoy no hay flexiones para él.',
  '¡Skip! {o} escapa esta vez. La próxima no habrá tanta suerte.',
  '{p} salta el turno de {o}. Qué poderío.',
];

const REVERSE_JOKES: JokeList = [
  '¡Reversa! Como cuando pisas el Lego a oscuras.',
  '¡Cambio de sentido! {o} se relaja mientras {p} trabaja.',
  'El giro de guion que nadie esperaba. Bueno, {p} sí.',
  'La reversión del destino: {p} sigue flexionando. El karma existe.',
  '¡Reversa! Como la dieta que empiezas el lunes.',
  'Vuelta de tuerca: {p} no se libra hoy.',
  '¡Cambio de planes! {o} descansa, {p} suda.',
  'El universo ha girado. {p} nota el giro en los brazos.',
];

const DRAW2_JOKES: JokeList = [
  '+2 en UNO, +2 en flexiones. La matemática del sufrimiento.',
  '¡{o} acepta los +2! Los brazos también lo hacen.',
  'Doble ración, doble sufrimiento, doble orgullo para {o}.',
  '¡{p} reparte deuda muscular! {o} la paga.',
  '+2 es la tarjeta de crédito del gimnasio: siempre hay que devolver.',
  'El banco muscular cobra intereses. {o} lo sabe ahora.',
  '¡El combo! {p} manda +2 y {o} lo agradece con los bíceps.',
  '¡Bonus! {o} tiene el doble de oportunidades de ponerse fuerte.',
];

const WILD_JOKES: JokeList = [
  'Comodín. La carta que decide que nadie está a salvo.',
  'El comodín llega como la factura de la luz: siempre a destiempo.',
  'El universo ha decidido ser caótico hoy. Bienvenidos.',
  'Comodín: porque el azar también tiene sentido del humor.',
  'La carta dice "decide tú". Los músculos esperan.',
  '¡Comodín! El caos organizado del UNO Gym.',
  'Ni rojo ni azul. El caos no entiende de colores.',
  'El comodín mira a los jugadores. Los jugadores miran al comodín.',
];

const NUMBER_JOKES: Record<string, string> = {
  '0': '¡Un cero! ¿Simbólico o trampa? Haz 10 mejor.',
  '1': '¡Solo uno! Aunque con este calor parece diez.',
  '2': '¡Dos! Tan fácil que da vergüenza decir que duele.',
  '3': '¡Tres! Ya estás calentando motores.',
  '4': '¡Cuatro! El número de los valientes del gimnasio.',
  '5': '¡Cinco! A mitad de la decena. Ya queda menos.',
  '6': '¡Seis! El número que hace sudar a los de nivel bajo.',
  '7': '¡Siete! Suerte del siete, o eso dicen.',
  '8': '¡Ocho! Ya estás casi en modo profesional.',
  '9': '¡Nueve! A uno de los dobles dígitos. Eres una máquina.',
};

const MILESTONE_JOKES: Record<number, string> = {
  5:   'Ya van 5 cartas. El cuerpo empieza a sospechar.',
  10:  '¡10 cartas! Ya casi eres atleta... o ya casi te duelen los brazos.',
  15:  '15 rondas. El mazo no tiene piedad. Vosotros tampoco.',
  20:  '¡20! Esto ya no es un juego, es un entrenamiento con alma.',
  25:  '25 cartas. ¿Alguien pidió un día de descanso? No fue el mazo.',
  30:  '¡30 rondas! La mitad de la baraja. Sois unos fenómenos.',
  40:  '40 cartas. El mazo os respeta. Vosotros al mazo también.',
  50:  '¡50! Cincuenta razones para estar orgullosos... y agotados.',
  75:  '75 cartas. Ya esto es atletismo de élite con naipes.',
  100: '¡100 cartas! Mandad el CV al equipo olímpico.',
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fill(joke: string, player: string, other = ''): string {
  return joke.replace(/\{p\}/g, player).replace(/\{o\}/g, other);
}

export function getJoke(
  value: CardValue,
  player: string,
  other: string,
): string {
  if (value === 'skip')    return fill(pick(SKIP_JOKES),    player, other);
  if (value === 'reverse') return fill(pick(REVERSE_JOKES), player, other);
  if (value === 'draw2')   return fill(pick(DRAW2_JOKES),   player, other);
  if (value === 'wild' || value === 'wild4') return pick(WILD_JOKES);
  if (NUMBER_JOKES[value]) return NUMBER_JOKES[value];
  return fill(pick(FLEX_JOKES), player, other);
}

export function getMilestoneJoke(count: number): string | null {
  const milestones = Object.keys(MILESTONE_JOKES).map(Number);
  const hit = milestones.find((m) => m === count);
  return hit ? MILESTONE_JOKES[hit] : null;
}
