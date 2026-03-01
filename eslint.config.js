import js from "@eslint/js";
import globals, { jest } from "globals";
import { defineConfig } from "eslint/config";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, jest },
    extends: ["js/recommended", 'plugin:jest/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,  // ← Добавляем глобалы Jest (describe, test, it и т.д.)
      },
    },
  },
];