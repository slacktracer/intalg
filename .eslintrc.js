module.exports = {
  env: { es6: true, node: true },
  extends: 'eslint:recommended',
  parserOptions: { sourceType: 'module' },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'never' ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'max-len': [ 'error', 80 ],
    'object-curly-spacing': [ 'error', 'always' ],
    'padded-blocks': [ 'error', 'always' ],
    semi: [ 'error', 'never' ],
    'space-before-function-paren': [ 'error', 'always' ]
  }
}
