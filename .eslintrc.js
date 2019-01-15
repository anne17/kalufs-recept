module.exports = {
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 6
    },
    rules: {
        // 'no-console': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0
    }
};
