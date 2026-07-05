# ⚡ Pokédex V2 ⚡

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A high-performance Pokédex database client demonstrating modern Next.js server architectural patterns, Incremental Static Regeneration (ISR) caching strategies, and strict TypeScript schema validation.

---

## 🏗️ Architectural Highlights

To move beyond the basic API-wrapper prototype, this system implements several production-grade architectural patterns:
1. **Server-Side Data Hydration**: Leveraging Next.js Server Components, Pokemon listing requests are resolved concurrently on the server. This prevents client-side waterfalls and optimizes Time-to-Interactive (TTI).
2. **ISR Caching**: Configured Incremental Static Regeneration with a 24-hour revalidation window (`revalidate: 86400`). This ensures static-file loading speeds for users while keeping data fresh.
3. **Strict Domain Mapping**: Integrates strict TypeScript schema interfaces mapping Raw API responses to clear, decoupled UI models (`PokemonDetails`, `PokemonListItem`), maintaining compile-time safety and clean component APIs.

---

## 🌟 Key Features

### 🏷️ Mapped Type Browsing & Filtering
- Filter and explore Pokémon by their primary elemental types.
- Dedicated categories and filters for Legendary Pokémon, Mega Evolutions, and Ultra Beasts.

### 🎴 Responsive UI & Interactive Detail Modals
- Clean, responsive glassmorphism UI cards with interactive hover scale animations.
- Detailed modal overlays displaying weight, height, base stats comparison charts, and structural evolution pathways.

### 👁️ WCAG / Accessibility Compliance
- Designed with keyboard navigation support, screen-reader semantic aria-attributes, and custom accessible color contrasts.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (v16+)](https://nextjs.org/) - App Router, Server Components
- **Library:** [React 19](https://react.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) - End-to-end type safety

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- npm, yarn, pnpm, or bun

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sudo-sadhu/pokedex-v2.git
   cd pokedex-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
