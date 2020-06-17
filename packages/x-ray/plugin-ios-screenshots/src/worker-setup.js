const { workerData } = require('worker_threads')

require('@babel/register')({
  babelrc: false,
  compact: false,
  inputSourceMap: false,
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: { node: 'current' },
        ignoreBrowserslistConfig: true,
      },
    ],
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-bigint'),
  ],
  overrides: [
    {
      test: /\.(ts|tsx)$/,
      presets: [
        require.resolve('@babel/preset-typescript'),
      ],
    },
    {
      test: /\.(ts|js)x$/,
      presets: [
        require.resolve('@babel/preset-react'),
      ],
    },
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
})

require('./worker').check(workerData)
