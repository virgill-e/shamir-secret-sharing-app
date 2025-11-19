# Shamir Secret Sharing App

Application desktop de partage de secrets utilisant l'algorithme de Shamir. Permet de diviser un secret en plusieurs parts (shares) et de le reconstruire avec un nombre minimum de parts.

## Description

Cette application implémente le partage de secrets de Shamir, un algorithme cryptographique qui permet de diviser un secret en N parts, où seules K parts sont nécessaires pour reconstruire le secret original. Par exemple, vous pouvez diviser un mot de passe en 5 parts et exiger 3 parts pour le reconstruire.

**Fonctionnalités :**
- Division d'un secret en plusieurs shares avec un seuil configurable
- Reconstruction du secret à partir d'un nombre minimum de shares
- Interface moderne et intuitive
- Copie rapide des shares et du secret reconstruit
- Validation des entrées et gestion des erreurs

**Technologies :**
- Electron
- Vue 3 + TypeScript
- Tailwind CSS
- secrets.js-grempe

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

L'application Electron se lance automatiquement avec hot-reload activé.

## Compiler l'application

### Pour macOS

```bash
npm run build:mac
```

### Pour Windows

```bash
npm run build:win
```

### Pour Linux

```bash
npm run build:linux
```

Les binaires compilés se trouvent dans le dossier `dist/`.

## Structure du projet

```
src/
├── main/                # Process principal Electron
│   ├── crypto/         # Logique de chiffrement Shamir
│   └── index.ts        # Point d'entrée + handlers IPC
├── preload/            # Bridge sécurisé
│   ├── index.ts        # API exposée au renderer
│   └── index.d.ts      # Types TypeScript
└── renderer/           # Interface utilisateur Vue
    └── src/
        └── components/
            ├── EncryptTab.vue   # Génération des shares
            └── DecryptTab.vue   # Reconstruction du secret
```