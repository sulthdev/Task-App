import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ImageFeedScreen from "../screens/ImageFeedScreen";
import { Photo } from "../../types/types";

export type RootStackParamList = {
	Login: undefined;
	Home: undefined;
	ImageFeed: { item: Photo };
};

const RootNavigator = () => {
	const Stack = createNativeStackNavigator<RootStackParamList>();

	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="ImageFeed" component={ImageFeedScreen} />
		</Stack.Navigator>
	);
};

export default RootNavigator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
	},
});
