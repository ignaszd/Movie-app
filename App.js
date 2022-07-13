import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrowseScreen from "./src/screens/BrowseScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import PlayerScreen from "./src/screens/PlayerScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import HomeScreen from "./src/screens/HomeScreen";
const Stack = createNativeStackNavigator();

export default () => {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="browse" component={BrowseScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};
