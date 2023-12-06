import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar style="auto" backgroundColor="#fff" />
				<RootNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
