import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import EmergencyButton from '../EmergencyButton';

// Helper function to split array into chunks of two
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function ButtonGrid( {buttonData} ) {
  // Split button data into rows of two
  const buttonRows = chunkArray(Object.values(buttonData), 2);  //use Object.values to convert dict --> list

  return (
    <ScrollView style={styles.scrollView}>
      {buttonRows.map((row, index) => (
        <View key={index} style={styles.buttonRow}>
          {row.map((button, btnIndex) => (
            <EmergencyButton
              key={btnIndex}
              title={button.title}
              message={button.message}
              bgColor={button.bgColor}
              isPermanent={button.is}
              buttonObject={button}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16, // Equivalent to p-4
    backgroundColor: '#4A154B', // Equivalent to bg-[#4a154b]
  },
  buttonRow: {
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'center', // Equivalent to justify-center
    marginBottom: 16, // Equivalent to mb-4
  },
});