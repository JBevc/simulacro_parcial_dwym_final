import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage";
import PlanetInfo from "./pages/PlanetInfo";
import AddPlanet from "./pages/AddPlanet";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="PlanetInfo"
          component={PlanetInfo}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="AddPlanet"
          component={AddPlanet}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
