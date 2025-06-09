# Pearl UI

Pearl UI is a modern, modular dashboard application built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). It features a flexible sidebar navigation, theming, and a set of demo pages for dashboard, activity, documents, members, folders, and conversations. The project is designed as a UI/UX demo and a starting point for building collaborative, multi-section web apps.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [UI Guidelines](#ui-guidelines)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Dashboard Overview**: Central hub with quick access to all main sections.
- **Sidebar Navigation**: Modular, collapsible sidebar with support for projects, folders, and user actions.
- **Theming**: Light/dark mode toggle, with theme persistence.
- **Demo Pages**: Includes Activity, Documents, Members, Folders, and Conversations.
- **Component Library**: Built with reusable UI components (buttons, inputs, dropdowns, cards, etc.).
- **Responsive Design**: Fully responsive layout for desktop and mobile.
- **TypeScript**: Type-safe codebase for reliability and maintainability.

---


## Project Structure

```
my-app/
├── src/
│   ├── app/                # App directory (pages, layouts, routes)
│   │   ├── dashboard/      # Dashboard sections (home, activity, documents, members, folders, conversations)
│   │   ├── guidelines/     # UI guidelines and style guide
│   │   ├── login/          # Login page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable React components
│   │   ├── ui/             # UI primitives (button, input, sidebar, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── demoData.ts         # Demo data for navigation and projects
│   └── demoData-sidebar.ts # Demo data for sidebar navigation
├── public/                 # Static assets (images, favicon, etc.)
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration (if present)
└── README.md               # Project documentation
```

---

## Available Scripts

- `dev`: Start the development server.
- `build`: Build the app for production.
- `start`: Start the production server.
- `lint`: Run ESLint for code quality.

Example:
```bash
npm run dev
```

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Libraries**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State & Routing**: Next.js App Router, React Context
- **Linting**: ESLint
- **Styling**: PostCSS, Tailwind CSS, CSS Modules

---

## UI Guidelines

A dedicated [UI Guidelines page](/guidelines) is available in the app, showcasing:

- Input fields
- Dropdown menus
- Button variants
- Typography styles
- Theme toggling (light/dark)

You can use these as a reference for building new UI components or extending the design system.

---

## Customization

- **Theming**: Easily toggle between light and dark mode. Theme preference is saved in local storage.
- **Sidebar**: Add or modify navigation items in `src/demoData-sidebar.ts` and `src/demoData.ts`.
- **Components**: Extend or customize UI components in `src/components/ui/`.

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, improvements, or new features.

---

## License

This project is for demo and educational purposes. Add your license here.
