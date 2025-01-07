import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", 'prettier'),
  {
    files: ["**/*.ts", "**/*.tsx"], // Especificamos los archivos .ts y .tsx
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignorar parámetros no utilizados
          varsIgnorePattern: "^(error)$", // Ignorar la variable 'error'
          caughtErrorsIgnorePattern: "^_", // Ignorar errores capturados no utilizados
        },
      ],
    },
  },
];

export default eslintConfig;
