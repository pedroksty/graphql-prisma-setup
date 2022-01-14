module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['babel-plugin-transform-typescript-metadata'],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views',
        '@modules': './src/modules',
        '@shared': './src/shared',
        '@models': './src/models',
        '@repositories': './src/repositories',
        '@errors': './src/errors',
        '@middlewares': './src/middlewares'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
