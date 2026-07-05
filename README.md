# ⚡ Pokédex V2 Accessibility Reference Architecture ⚡

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Accessibility WCAG](https://img.shields.io/badge/Accessibility-WCAG%20AA-brightgreen)](https://www.w3.org/WAI/standards-guidelines/wcag/)

An accessibility-oriented version of the Pokédex V2 database client designed to ensure that everyone, including users with visual, auditory, motor, or cognitive impairments, can search, filter, and navigate the database seamlessly.

---

## 👁️ Accessibility Design Patterns

This repository serves as a reference architecture for implementing modern web accessibility guidelines:
- **ARIA Landmark & Roles**: Implements explicit ARIA landmarks (`role="menubar"`, `role="menuitem"`, `role="dialog"`, `aria-modal="true"`) to ensure clean navigation maps for screen readers (NVDA, JAWS, VoiceOver).
- **Aria-Live Dynamic Announcements**: Employs polite dynamic announcements (`aria-live="polite"`) to notify screen-reader users of async state transitions when filtering categories or loading search inputs.
- **Enhanced Focus & Keyboard Traps**: Implements custom keyboard navigation (`tabindex="0"`, focus rings, escape-key modal closures, and skip-links) to allow full system manipulation without relying on pointer devices.
- **Color Contrast & Ratios**: Designed in accordance with WCAG 2.1 AA color contrast minimum requirements (minimum 4.5:1 ratio for body text).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Compliance**: WCAG 2.1 AA / Section 508

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sudo-sadhu/pokedex-v2.git
   cd pokedex-v2
   # checkout the accessibility branch
   git checkout feature-accessibility
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
