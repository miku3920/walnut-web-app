module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@/factory.mjs', './src/factory.mjs']],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'import/extensions': ['error', { mjs: 'always' }],
    'no-param-reassign': 'off',
    'no-empty': 'off',
  },
  ignorePatterns: ['dist', 'src/hmacSHA256'],
  overrides: [
    {
      files: ['src/**/*.js'],
      rules: {
        semi: ['error', 'always'],
        'object-shorthand': 'off',
        'prefer-arrow-callback': 'off',
        'prefer-template': 'off',
        'prefer-destructuring': ['error', { object: false, array: false }],
        'no-var': 'off',
        'vars-on-top': 'off',
        'func-names': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
      },
    },
  ],
}
