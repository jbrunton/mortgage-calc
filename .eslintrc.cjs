module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:boundaries/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "boundaries"],
  root: true,
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "disallow",
        rules: [
          {
            from: "entities",
            allow: ["entities"],
          },
          {
            from: "usecases",
            allow: ["entities", "usecases"],
          },
          {
            from: "components",
            allow: ["entities", "usecases", "components"],
          },
          {
            from: "app",
            allow: ["entities", "usecases", "components", "app"],
          },
          {
            from: "main",
            allow: ["app"],
          },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      {
        type: "entities",
        pattern: "src/domain/entities",
      },
      {
        type: "usecases",
        pattern: ["src/domain/usecases"],
      },
      {
        type: "components",
        pattern: "src/components",
      },
      {
        type: "app",
        pattern: ["src/app"],
      },
      {
        type: "main",
        pattern: ["src/main.tsx"],
        mode: "file",
      },
    ],
    "boundaries/ignore": ["**/*.spec.ts", "test/**/*"],
  },
};
