// Ambient declarations for global stylesheet side-effect imports,
// e.g. `import './globals.css'`.
//
// Next.js ships type declarations for CSS Modules (`*.module.css` etc.) but
// not for plain `*.css`, so newer TypeScript versions (with
// `noUncheckedSideEffectImports`) flag the side-effect import unless we
// declare it here.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
