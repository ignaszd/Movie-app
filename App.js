import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from './src/screens/BrowseScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {useFonts} from "expo-font";
import AppLoading from 'expo-app-loading';
const Stack = createNativeStackNavigator();

export default () => {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
  });

  return fontLoaded ? (
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
  ) : (<AppLoading /> );
};

