module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    // 'module:react-native-dotenv',
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@Utilities': './src/Utilities',
          '@Types': './src/Types',
          '@Screens': './src/Screens',
          '@Routes': './src/Routes',
          '@Resources': './src/Resources',
          '@Redux': './src/Redux',
          '@Components': './src/Components',
          '@Common': './src/Components/Common',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
