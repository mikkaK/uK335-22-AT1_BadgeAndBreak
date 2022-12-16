import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Text,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import Home from "./src/components/pages/Home";
import Details from "./src/components/pages/Details";
import { ImageBackground } from "react-native";


type RootStackParamList = {
  Home: {};
  Details: {};
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF597B",
    secondary: "#FF8E9E",
    tertiary: "#F9B5D0",
    neutral: "#EEEEEE",
    error: "#BA1A1A",
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFD8DD",
    onPrimaryContainer: "#400012"
  
  }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Details">
          <Stack.Screen 
          name="Details"
          component={Details}
          options={{ title: "Edit" }}
          />
          <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Reminders" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

