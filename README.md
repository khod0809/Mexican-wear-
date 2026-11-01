# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Running this export

```sh
bun install        # or: npm install
bun run dev        # or: npm run dev
```

Open http://localhost:8080. The storefront is `/`; the owner panel is `/admin`.

- `.env` holds the backend address and publishable key the app talks to. These are
  browser-safe values. If you move the app to your own backend, replace them.
- `drizzle/migrations/` holds the database schema and seed data (products, owner
  roles, site settings) as plain SQL.
- Store photos live in `src/assets/` as ordinary `.jpg` files, so the site renders
  without any Lovable-only services.
- `bun run test` runs the checks in `src/test/`.
