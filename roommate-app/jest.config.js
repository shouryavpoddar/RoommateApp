  module.exports = {
    preset: 'react-native', // Use the React Native preset
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS, JSX, TS, and TSX using Babel
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|react-navigation|react-native-calendars|react-native-swipe-gestures|react-native-vector-icons|@react-native|@react-navigation|react-redux|@react-native-vector-icons|expo|expo-status-bar|expo-modules-core|nativewind)/)', 
      // Add necessary packages here to be transformed
    ],
    setupFilesAfterEnv: ['./jest.setup.js'], // Setup custom matchers
    testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'], // Ignore these paths for tests
};
