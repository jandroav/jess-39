# 🎁 Jess 39 - El Viaje de Cumpleaños & Misión de Salud

Aplicación web gamificada e interactiva creada para el **39º cumpleaños de Jess (20 de Agosto de 2026)**, optimizada específicamente para ser visualizada y navegada en una **televisión de 100 pulgadas Samsung** a través del mando a distancia (D-Pad / cruceta).

---

## 🌟 Características Principales

- 📺 **Diseño 10-Foot UI para Televisión de 100"**: Tipografías gigantes de alto contraste, zonas de seguridad de bordes (overscan), indicadores de enfoque de alta visibilidad con bordes dorados de neón y animaciones fluidas.
- 🎮 **Navegación Interactiva con Mando a Distancia (D-Pad)**:
  - `▲ ▼ ◄ ►` (Flechas del mando): Moverse por los niveles e interfaz.
  - `OK / Enter`: Seleccionar, desvelar misterios y avanzar de nivel.
  - `ESC / Back`: Volver atrás o cerrar modales.
- 🔊 **Motor de Audio Sintetizado (Web Audio API)**: Sonidos de navegación, revelación de misterios y fanfarrias de victoria sin depender de archivos de audio externos. El audio está siempre activo (no hay silenciador).
- 🗺️ **Vuelta al Mapa Entre Niveles**: Al resolver un reto se desbloquea el siguiente nivel, pero nunca se abre solo — hay que volver al inicio y elegirlo con la cruceta del mando.
- 👣 **3 Niveles de Regalo (de menor a mayor importancia)**:
  1. **Zapatillas Barefoot**: Conexión biomecánica, cero drop, puntera anatómicamente libre y propiocepción.
  2. **Oura Ring 5 (Negro / Black Edition)**: 6 pilares científicos — estrés y resiliencia, edad cardiovascular, metabolismo, ciclo hormonal NTC, arquitectura del sueño y precisión de grado clínico.
  3. **Cena Gastronómica en Casa Marcial (2 Estrellas Michelin / 3 Soles Repsol)**: Experiencia gastronómica de lujo en Arriondas, Asturias.
- 🎂 **Fiesta Final & Velas 39**: Minijuego para soplar las velas de 39 años con lanzamiento de fuegos artificiales y confeti.

---

## 🚀 Cómo Ejecutar el Sitio Web en Local

### 1. Requisitos Previos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### 2. Instalación de Dependencias
Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

### 3. Iniciar Servidor Local con Acceso a la Red de casa (para la TV)
Para que puedas abrir la web desde el navegador de tu televisión Samsung en la misma red Wi-Fi:

```bash
npm run dev -- --host
```

La terminal mostrará dos direcciones de acceso:
- **Local (en tu ordenador)**: `http://localhost:5173/`
- **Red Local (para la Televisión)**: `http://192.168.x.x:5173/`

### 4. Abrir en la Televisión Samsung de 100"
1. Enciende la TV y abre la aplicación **Navegador Web / Internet**.
2. Escribe la dirección IP local de tu ordenador (ej. `http://192.168.1.250:5173/`).
3. Usa la cruceta del mando a distancia para comenzar a jugar.

---

## 🌐 Cómo Desplegar en GitHub Pages

El proyecto ya incluye la configuración `base: './'` en Vite y el paquete `gh-pages` preconfigurado.

### Opción A: Despliegue Directo desde la Terminal (Recomendado)

1. **Inicializa tu repositorio Git** (si aún no lo has hecho) y sube los cambios a GitHub:

```bash
git init
git add .
git commit -m "feat: Jess 39th birthday app"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/jess.git
git push -u origin main
```

2. **Ejecuta el comando de despliegue**:

```bash
npm run deploy
```

Este comando compilará la versión de producción (`npm run build`) y publicará automáticamente los archivos en la rama `gh-pages` de tu repositorio.

3. **Activar GitHub Pages en tu Repositorio**:
   - Entra en tu repositorio en GitHub.
   - Ve a **Settings** (Configuración) > **Pages**.
   - En **Source** (Fuente), selecciona la rama `gh-pages` / `/ (root)` y guarda.
   - Tu sitio estará disponible en: `https://TU_USUARIO.github.io/jess/`

---

### Opción B: Despliegue Automático con GitHub Actions

Si prefieres que GitHub compile y despliegue automáticamente cada vez que hagas `git push`:

1. Crea la carpeta `.github/workflows/deploy.yml` con el siguiente contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Haz commit de este archivo y al hacer `git push`, GitHub se encargará del despliegue automático.

---

## 📂 Estructura del Proyecto

```text
jess/
├── src/
│   ├── components/
│   │   ├── BackgroundParticles.tsx # Lienzo canvas de estrellas/partículas flotantes
│   │   ├── GiftDetailModal.tsx     # Modal de intriga y datos de salud
│   │   ├── GiftVisual.tsx          # Ilustraciones vectoriales personalizadas
│   │   └── LevelMap.tsx            # Árbol de niveles de regalos
│   ├── assets/
│   │   └── oura-ring-black.jpg     # Foto real del Oura Ring 5 en negro
│   ├── data/
│   │   └── giftsData.ts            # Datos, acertijos y los 6 pilares de cada regalo
│   ├── utils/
│   │   └── audio.ts                # Sintetizador de audio Web Audio API
│   ├── App.tsx                     # Gestor de navegación y control de mando D-Pad
│   ├── index.css                   # Sistema de diseño 10-Foot UI para TV
│   └── main.jsx                    # Punto de entrada de React
├── index.html                      # Documento HTML con fuentes Cinzel & Outfit
├── vite.config.js                  # Configuración de Vite + TailwindCSS + GitHub Pages
└── package.json                    # Scripts de ejecución y despliegue
```

---

¡Disfrutad del cumpleaños de Jess! ❤️🎉
