# UNO Gym 🏋️

> Saca una carta UNO al azar, lee quién flexiona, toca de nuevo. Ideal para alternar con un amigo en el gimnasio sin tocar nada más.

---

## Qué es

**UNO Gym** es una app móvil minimalista para el gimnasio. Nada de puntos ni turnos — solo cartas UNO grandes que aparecen al tocar la pantalla para decidir quién hace las flexiones (o cualquier ejercicio que queráis).

Mazo oficial: **108 cartas**, se baraja solo al acabarse.

---

## Modos de juego

### ⚔️ 1 vs 1 Tradicional
Solo dos jugadores. Cada carta siempre asigna a uno **u** otro, sin "los dos" ni "elige quién". Máxima claridad.

| Color | Quién flexiona |
|-------|----------------|
| 🔴 Rojo | Jugador 1 |
| 🔵 Azul | Jugador 2 |
| 🟢 Verde | Jugador 1 |
| 🟡 Amarillo | Jugador 2 |
| ⚫ Comodín | J1 · +4 = J2 |

### 🎲 Variedad (2 jugadores)
Más variado: los dos, elige quién, reglas por carta especial.

| Carta | Regla |
|-------|-------|
| Rojo / Azul | Jugador asignado al color |
| Verde | Los dos |
| Amarillo | Quien sacó la carta elige |
| +2 | El otro hace el doble |
| Salta | El otro se salta, tú flexionas |
| Comodín | Lo que queráis |
| Número | Par = J1 · Impar = J2 · Reps = el número |

### 👥 Multijugador
De **2 a 6 jugadores** con nombres personalizados. Cada color va a un jugador; con más de 4, los números reparten entre todos por módulo.

---

## Instalación

### Requisitos
- [Node.js LTS](https://nodejs.org/)
- iPhone con **[Expo Go](https://apps.apple.com/app/expo-go/id982107779)** instalado y actualizado
- Expo SDK 55

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar (modo tunnel — funciona sin necesidad de misma Wi‑Fi)
npm start

# Alternativa: red local (mismo Wi‑Fi, más rápido)
npm run start:lan
```

3. Espera a que aparezca el QR en la terminal (~30 s la primera vez).
4. Escanéalo con la **cámara del iPhone** o desde la app **Expo Go**.
5. ¡Listo!

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Expo en modo **tunnel** (recomendado para iPhone) |
| `npm run start:lan` | Expo en red local (más rápido, misma Wi‑Fi) |
| `npm run ios` | Simulador iOS (solo macOS) |
| `npm run android` | Simulador Android |

---

## Solución de problemas

| Error | Solución |
|-------|----------|
| "Incompatible with Expo Go" | Actualiza Expo Go desde el App Store |
| No conecta / timeout | Usa `npm start` (tunnel). Cierra otras instancias antes. |
| Puerto ocupado | Cierra terminales con `npm start` previos y relanza |
| Firewall Windows | Permite Node.js en redes privadas cuando Windows lo pida |

---

## Estructura del proyecto

```
uno-gym/
├── App.tsx                          # Raíz: navegación entre pantallas
├── app.json                         # Config Expo
├── src/
│   ├── components/
│   │   └── UnoCardView.tsx          # Carta grande táctil
│   ├── game/
│   │   ├── config.ts                # Tipos y configs de modo
│   │   └── assignPlayer.ts          # Lógica de asignación por modo
│   ├── screens/
│   │   ├── HomeScreen.tsx           # Menú de selección de modo
│   │   ├── GameScreen.tsx           # Pantalla de juego
│   │   └── MultiSetupScreen.tsx     # Config multijugador
│   ├── deck.ts                      # Mazo UNO (108 cartas) + barajado
│   ├── types.ts                     # Tipos TypeScript
│   ├── cardLabels.ts                # Textos de colores y valores
│   └── theme.ts                     # Paleta de colores de cartas
```

---

## Renombrar en GitHub

El repositorio en GitHub se llama `JUEGO-UNO`. Para renombrarlo a `uno-gym`:

1. Ve a **Settings** del repo en GitHub.
2. Cambia el nombre a `uno-gym`.
3. Actualiza el remote local:

```bash
git remote set-url origin https://github.com/Oscarlbs/uno-gym.git
```
