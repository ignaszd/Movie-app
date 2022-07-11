import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Browse screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BrowseScreen;