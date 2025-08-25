
# BeMobile Marvel Challenge

## 🌐 Live Demo

Access the deployed app here: [https://be-mobile-challenge.vercel.app/](https://be-mobile-challenge.vercel.app/)

---

## 🚀 English

### Description

This is a Next.js application that allows users to explore Marvel characters and comics. You can search, view details, and save your favorite characters. The app uses the official Marvel API.

### Features

- Search for Marvel characters
- View character details and description
- See comics related to each character
- Mark/unmark characters as favorites (saved in local storage)
- Filter to show only favorites
- Responsive and modern UI

### Getting Started

#### Prerequisites
- Node.js >= 18
- npm, yarn, pnpm, or bun

#### Installation

1. Clone the repository:
	```bash
	git clone https://github.com/JoanGuinart/BeMobileChallenge.git
	cd BeMobileChallenge
	```
2. Install dependencies:
	```bash
	npm install
	# or
	yarn install
	# or
	pnpm install
	# or
	bun install
	```

#### Environment Variables

You need Marvel API keys. Create a `.env.local` file in the root with:

```env
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key
```

Get your keys at [Marvel Developer Portal](https://developer.marvel.com/).

#### Running Locally

Start the development server:

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Building for Production

```bash
npm run build
npm start
```

#### Linting

```bash
npm run lint
```

### Usage

1. Search for characters using the search bar.
2. Click a character to view details and related comics.
3. Click the heart icon to add/remove favorites.
4. Use the filter on header (heart) to show only your favorite characters.

### Technologies

- Next.js 15
- React 19
- TypeScript
- SCSS Modules
- Marvel API

### Deployment

The app is deployed on Vercel: [https://be-mobile-challenge.vercel.app/](https://be-mobile-challenge.vercel.app/)

### Development and Production Modes

This app automatically serves assets differently depending on the mode:

- **Development mode** (`npm run dev`): assets (JavaScript, CSS, etc.) are served unminified and uncompressed for easier debugging and development.
- **Production mode** (`npm run build` + `npm start`): assets are concatenated and minified for optimal performance and faster loading.

No extra configuration is needed; Next.js handles this by default.

### Running Tests with Playwright
This project uses **Playwright** for end-to-end testing. To run the tests:

```bash
# Install Playwright (if not installed)
npx playwright install

# Run all tests
npm run test
# or
npx playwright test

# Run tests in headed mode (with browser visible)
npx playwright test --headed

# Generate test report
npx playwright show-report



---



## 🇪🇸 Español

### Descripción

Esta es una aplicación Next.js para explorar personajes y cómics de Marvel. Puedes buscar, ver detalles y guardar tus personajes favoritos. Utiliza la API oficial de Marvel.

### Funcionalidades

- Buscar personajes de Marvel
- Ver detalles y descripción de cada personaje
- Ver cómics relacionados
- Marcar/desmarcar personajes como favoritos (guardados en local storage)
- Filtrar para mostrar solo favoritos
- Interfaz moderna y adaptable

### Primeros pasos

#### Requisitos
- Node.js >= 18
- npm, yarn, pnpm o bun

#### Instalación

1. Clona el repositorio:
	```bash
	git clone https://github.com/JoanGuinart/BeMobileChallenge.git
	cd BeMobileChallenge
	```
2. Instala las dependencias:
	```bash
	npm install
	# o
	yarn install
	# o
	pnpm install
	# o
	bun install
	```

#### Variables de entorno

Necesitas claves de la API de Marvel. Crea un archivo `.env.local` en la raíz con:

```env
MARVEL_PUBLIC_KEY=tu_clave_publica
MARVEL_PRIVATE_KEY=tu_clave_privada
```

Consigue tus claves en [Marvel Developer Portal](https://developer.marvel.com/).

#### Ejecutar en local

Inicia el servidor de desarrollo:

```bash
npm run dev
# o yarn dev / pnpm dev / bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

#### Construir para producción

```bash
npm run build
npm start
```

#### Linting

```bash
npm run lint
```

### Uso

1. Busca personajes usando la barra de búsqueda.
2. Haz clic en un personaje para ver detalles y cómics relacionados.
3. Haz clic en el icono de corazón para añadir/quitar favoritos.
4. Usa el filtro para mostrar solo tus personajes favoritos.

### Tecnologías

- Next.js 15
- React 19
- TypeScript
- SCSS Modules
- Marvel API

### Despliegue

La app está desplegada en Vercel: [https://be-mobile-challenge.vercel.app/](https://be-mobile-challenge.vercel.app/)

### Modo desarrollo y modo producción

La aplicación sirve los archivos de forma diferente según el entorno:

- **Modo desarrollo** (`npm run dev`): los assets (JavaScript, CSS, etc.) se sirven sin minimizar ni comprimir, facilitando la depuración y el desarrollo.
- **Modo producción** (`npm run build` + `npm start`): los assets se sirven concatenados y minimizados para un mejor rendimiento y carga más rápida.

No se necesita configuración adicional; Next.js lo gestiona automáticamente.

# Instala Playwright (si no está instalado)
npx playwright install

# Ejecuta todos los tests
npm run test
# o
npx playwright test

# Ejecuta los tests en modo visible (con navegador)
npx playwright test --headed

# Genera un reporte de tests
npx playwright show-report
