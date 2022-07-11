import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from './src/screens/BrowseScreen';
import DetailsScreen from './src/screens/DetailsScreen';
const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='browse' 
          component={BrowseScreen}
        />
        <Stack.Screen 
          name='details' 
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

