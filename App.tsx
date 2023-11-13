import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { RootStackParamList } from "./types";
import { StatusBar } from "react-native";
import RecentSearchesPage from "./pages/RecentSearchesPage";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
    <StatusBar backgroundColor={"#f0f0f0"} barStyle={"dark-content"}/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="UserPage" component={UserPage} />
        <Stack.Screen name="RecentSearchesPage" component={RecentSearchesPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
