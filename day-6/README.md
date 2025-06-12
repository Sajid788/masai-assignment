# ES6 Module with Vite

A demonstration project showing:

1. Vite configuration for bundling ES6 modules
2. Babel setup for transpiling modern JavaScript features (optional chaining and nullish coalescing)
3. ESLint configuration for code style and error detection
4. NPM scripts for development, building, and linting
5. Dynamic import for code splitting

## Features

- **Vite**: Fast bundling and local development server
- **Babel**: Transpiles ES6+ features to ensure broader browser compatibility
- **ESLint**: Enforces code style and catches potential errors
- **Dynamic Imports**: Demonstrates code-splitting with dynamic `import()`

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check for issues
- `npm run lint:fix`: Run ESLint and automatically fix issues

## Modern JavaScript Features

This project demonstrates:

- **Optional Chaining (`?.`)**: Safely access nested object properties without checking each level
- **Nullish Coalescing (`??`)**: Provide default values for null or undefined values
- **Dynamic Import**: Load modules on demand for better performance

## Project Structure

- `src/main.js`: Main application entry point
- `src/utils.js`: Utility module that's dynamically imported
- `vite.config.js`: Vite configuration
- `babel.config.js`: Babel configuration
- `.eslintrc.js`: ESLint rules configuration 