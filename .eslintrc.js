module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports': 2,
    'no-trailing-spaces': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    'import/prefer-default-export': 0,
    'eslint/no-explicit-any': 0,
    'import/no-cycle': 0,
    'comma-dangle': [
      'error',
      'never'
    ],
    'arrow-parens': [1, 'as-needed'],
    'max-len': [1, 130, 4, { ignoreUrls: true }],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    'react/jsx-sort-default-props': [
      'error',
      {
        ignoreCase: true
      }
    ],
    'linebreak-style': 0,
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'indent': 2,
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/no-children-prop': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false
      }
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [2, { 'extensions': ['.jsx'] }],
    'react/jsx-no-bind': ['off', {}],
    'react/prop-types': 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: [
          'node_modules',
          'src'
        ]
      }
    }
  },
};
