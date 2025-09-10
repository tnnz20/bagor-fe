# Bagor - Front End 🏢

Bagor is a modern web-based Information System (Sistem Informasi) built with Vue 3, TypeScript, and Vite. This system provides a comprehensive solution for managing business processes, data, and workflows in an efficient and user-friendly interface.

## 🚀 Features

- **Modern Tech Stack**: Built with Vue 3, TypeScript, and Vite for optimal performance
- **Modular Architecture**: Feature-based folder structure for scalable development
- **Responsive Design**: Mobile-first design approach with Tailwind CSS
- **Type Safety**: Full TypeScript support for better code reliability
- **Component Library**: Integrated with Shadcn/ui components
- **State Management**: Pinia for efficient state management
- **Routing**: Vue Router for seamless navigation

## 📋 Requirements

- Node.js (v22 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/tnnz20/bagor-fe.git && cd bagor-fe
```

### 2. Install dependencies

```bash
npm install

# or

yarn install
```

### 3. Environment Configuration

Copy the environment template and configure settings:

```bash
cp .env.example .env
```

## 🏗️ Build & Deploy

### Development Build

```bash
npm run build:dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```bash
src/
  components/      # Global reusable Vue & Shadcn components
    ui/            # Shadcn components
    layout/        # Layout components
  views/           # Route-level, page components
  modules/         # Feature/domain-specific modules
    auth/          # Example feature: authentication
      components/
      views/
      store/
      services/
      models/
      routes.ts
  store/           # Vuex or Pinia global state
  router/          # Route definitions
  assets/          # Static resources (images, fonts, etc)
  types/           # TypeScript type/interface definitions
  lib/             # Utility functions/helpers
  composables/     # Vue composables (like hooks)
  services/        # Business logic, API calls
App.vue
main.ts
```
