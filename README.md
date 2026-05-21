# UNO Gym

App móvil sencilla para sacar **cartas UNO al azar** con un toque. Pensada para el gimnasio: cartas grandes, una mano libre, alternar flexiones con un amigo.

## Cómo funciona

1. Abre la app.
2. **Toca la carta** (o el hueco inicial) → sale una carta aleatoria del mazo completo (108 cartas).
3. Cuando se agota el mazo, se baraja solo otra vez.

### Colores → quién hace flexiones (sugerencia)

| Color    | Idea rápida              |
|----------|--------------------------|
| Rojo     | Tú                       |
| Azul     | Tu amigo                 |
| Verde    | Los dos (p. ej. 5 reps)  |
| Amarillo | Quien sacó la carta elige|
| Comodín  | Elegís color = elegís quién |

Podéis cambiar las reglas como queráis; la app solo reparte cartas.

## Requisitos

- [Node.js](https://nodejs.org/) (LTS)
- iPhone con **Expo Go** actualizado ([App Store](https://apps.apple.com/app/expo-go/id982107779))
- El proyecto usa **Expo SDK 55** (compatible con la Expo Go actual)

## Instalación y uso en iPhone

```bash
cd "c:\Users\oscar\JUEGO UNO"
npm install
npm start
```

`npm start` usa **modo tunnel** para que el iPhone se conecte aunque Windows bloquee la red local.

1. Espera a que aparezca el QR (puede tardar ~30 s la primera vez).
2. Escanea con la **cámara del iPhone** o desde **Expo Go**.
3. Toca la carta para sacar la siguiente.

### Si sigue fallando

| Problema | Solución |
|----------|----------|
| "Incompatible with Expo Go" | Actualiza Expo Go en el App Store |
| No conecta / timeout | Usa `npm start` (tunnel). Evita `npm run start:lan` |
| Puerto ocupado | Cierra otras ventanas de `npm start` y vuelve a lanzar |
| Firewall Windows | Permite Node.js en redes privadas cuando Windows lo pregunte |

### Modo red local (más rápido, mismo Wi‑Fi)

```bash
npm run start:lan
```

PC e iPhone deben estar en la **misma Wi‑Fi**.

## Scripts

| Comando        | Descripción        |
|----------------|--------------------|
| `npm start`    | Inicia Expo        |
| `npm run ios`  | Abre simulador iOS (solo Mac) |

## Estructura

- `App.tsx` — pantalla principal
- `src/deck.ts` — mazo UNO y baraja
- `src/components/UnoCardView.tsx` — carta grande táctil
