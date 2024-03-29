module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      'alias': {
        'map': [
          ["@events", "./src/events"],
          ["@middleware", "./src/middleware"],
          ["@migrations", "./src/migrations"],
          ["@errors", "./src/errors"],
          ["@interfaces", "./src/interfaces"],
          ["@constants", "./src/constants"],
          ["@types", "./src/types"],
          ["@entities", "./src/entities"],
          ["@languages", "./src/api/v1/languages"],
          ["@users", "./src/api/v1/users"],
          ["@config", "./src/config.ts"],
          ["@words", "./src/api/v1/words"],
          ["@cards", "./src/api/v1/cards"],
          ["@tasks", "./src/api/v1/tasks"],
          ["@answers", "./src/api/v1/answers"],
        ],
        'extensions': ['.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        },
        "groups": [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index"
        ],
        "pathGroups": [
          {
            "pattern": "@**",
            "group": "external",
            "position": "after",
          }
        ],
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
