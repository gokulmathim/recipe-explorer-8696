# Recipe Explorer Frontend (Next.js)

Modern, light-themed, responsive UI for browsing, searching, filtering, viewing, and saving favorite food recipes.

## Features
- Browse recipes in a responsive grid
- Search and filter by cuisine, category, tags, and max cooking time
- View recipe details with ingredients and instructions
- Save/remove favorites (stored in localStorage)
- Pagination
- Modern light UI using Tailwind CSS v4

## Environment
Create a `.env.local` at repository root with:
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-host/api
```

The app expects backend REST endpoints:
- GET `${NEXT_PUBLIC_API_BASE_URL}/recipes?q&cuisine&category&maxTime&tags&page&pageSize`
  - Response: `{ items: Recipe[], total: number, page: number, pageSize: number }`
- GET `${NEXT_PUBLIC_API_BASE_URL}/recipes/:id`
  - Response: `Recipe`

## Develop
```
npm install
npm run dev
```

Open http://localhost:3000

## Build
```
npm run build
npm start
```

## Project Structure
- src/lib/api.ts: REST client and types
- src/lib/favorites.ts: local favorites store
- src/components/*: UI components (header, filters, grid, pagination)
- src/app/page.tsx: browse/search/filter page
- src/app/recipe/[id]/page.tsx: recipe detail
- src/app/favorites/page.tsx: favorites

## Design
Palette:
- primary: #4caf50
- secondary: #ff9800
- accent: #e91e63
Light theme, clean spacing, bordered cards, subtle shadows.
