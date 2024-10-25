module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript', // Add TypeScript preset
    ],
    plugins: [
      "nativewind/babel",
      'react-native-reanimated/plugin',
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
  };
};