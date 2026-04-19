<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
<!-- END:nextjs-agent-rules -->

## 1. Clean Code & Logic
### Self-Documenting Naming
- **Variables**: Use descriptive, readable names that reveal intent (e.g., `isUserAuthenticated` instead of `auth`).
- **Functions**: Functions must do exactly what their name suggests and nothing more (Single Responsibility).

### Readability & Structure
- **Keep It Small**: Divide large code blocks into small, focused functions for better maintainability.
- **Flatten Logic**: Minimize nested `if`, `switch`, and `for` loops. Use **Early Returns** to reduce indentation and improve clarity.

## 2. Core Technologies
### Tailwind CSS: Stick to the Scale
- **Priority**: Always use Tailwind’s built-in design tokens (xs, sm, md, lg, xl, 2xl, etc.) for spacing, sizing, and typography.
- **No Arbitrary Values**: Avoid using JIT arbitrary brackets (e.g., w-[2rem], p-[15px]) unless specific design requirements cannot be met with the standard scale.
- **Consistency**: If a specific custom value is needed frequently, extend `tailwind.config.js` instead of hardcoding it.

### TypeScript: Strict Type Safety
- **Zero 'any' Policy**: The use of the `any` type is strictly prohibited. 
- **Explicit Typing**: Every variable, function parameter, and return value must be explicitly typed.
- **Interfaces over Types**: Prefer `interface` for object definitions and `type` for unions or intersections.
- **Deep Typing**: Ensure complex objects and API responses are fully mapped out. Don't leave them as generic object types.
- **Generics**: Use generics appropriately to maintain type safety across reusable components or functions.

## 3. SEO & Internationalization
This project is built with `next-intl` and requires strict SEO standards for a global audience.

### 1. Unified Metadata
- **Dynamic Metadata**: Every page must export a `generateMetadata` function. Use `getTranslations` with the `Metadata` namespace.
- **Alternates & Hreflang**: Always include `alternates` with `canonical` and `languages` (en, zh, ja) in page metadata to avoid duplicate content flags.
- **Base URL**: Use `https://www.chocorot.net` as the `metadataBase`.

### 2. Localization Standards
- **Zero Hardcoded Strings**: All UI text must be stored in `messages/*.json`.
- **Tri-lingual Requirement**: Any new key added to `en.json` MUST also be added to `zh.json` (Simplified Chinese) and `ja.json` (Japanese).
- **Metadata Namespace**: Keep page titles and descriptions within the `Metadata` namespace in translation files for consistency.

### 3. SEO Discovery
- **Sitemap**: If adding a new top-level route, ensure it's added to the `paths` array in `src/app/sitemap.ts`.
- **Shell Management**: The `<html>` and `<body>` tags live in `src/app/[locale]/layout.tsx` to support the dynamic `lang` attribute. Do not move them back to the root layout.