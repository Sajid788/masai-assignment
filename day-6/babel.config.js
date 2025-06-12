module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: '> 0.25%, not dead',
      },
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
}; 