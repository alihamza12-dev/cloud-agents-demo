# Project Rules

## Tech Stack
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS for all styling
- No additional CSS libraries or styled-components
- Use npm, not yarn or pnpm

## File Organization
- New features go in src/features/{feature-name}/
- Shared UI components go in src/components/shared/
- Each feature folder is self-contained: its own components, utils, and types
- Never put feature-specific code in src/app/ except for route files
- API routes follow the pattern src/app/api/{feature-name}/route.ts

## Rules
- Never modify another feature's folder when working on a feature
- Never install new dependencies without documenting why in the PR description
- Use named exports, not default exports (except page.tsx files)
- All component props must have a TypeScript interface prefixed with I (e.g., IButtonProps)
- Keep components under 150 lines. If longer, split into sub-components within the same feature folder

## Commands
- Dev server: npm run dev
- Build: npm run build
- Lint: npm run lint
