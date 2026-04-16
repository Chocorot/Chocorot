<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


## Coding Standards & Style Guide
### Tailwind CSS: Stick to the Scale
- Priority: Always use Tailwind’s built-in design tokens (xs, sm, md, lg, xl, 2xl, etc.) for spacing, sizing, and typography.

- No Arbitrary Values: Avoid using JIT arbitrary brackets (e.g., w-[2rem], p-[15px]) unless the design requirement is impossible to meet with the standard scale.

- Consistency: If a specific custom value is needed frequently, ask to extend the tailwind.config.js instead of hardcoding it.

### TypeScript: Strict Type Safety
- Zero 'any' Policy: The use of the any type is strictly prohibited.

- Explicit Typing: Every variable, function parameter, and return value must be explicitly typed.

- Interfaces over Types: Prefer interface for object definitions and type for unions or intersections.

- Deep Typing: Ensure complex objects and API responses are fully mapped out. Don't leave them as generic object types.

- Generics: Use generics appropriately to maintain type safety across reusable components or functions.