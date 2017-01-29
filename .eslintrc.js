module.exports = {
  env: { es6: true, node: true },
  extends: 'eslint:recommended',
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'never' ],
    // 'comma-dangle': [
    //   'error',
    //   {
    //     arrays: 'always-multiline',
    //     objects: 'always-multiline',
    //     imports: 'always',
    //     exports: 'always',
    //     functions: 'never',
    //   },
    // ],
    'max-len': [ 'error', 80 ],
    'object-curly-spacing': [ 'error', 'always' ],
    semi: [ 'error', 'never' ],
  },
}
