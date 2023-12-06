import {
	Text,
	SafeAreaView,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { auth, TwitterAuthProvider } from "../../firebaseConfig";
import { RootStackParamList } from "../navigator/RootNavigator";
import { signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
	useProxy: true,
});

const useTwitter = () => {
	const result = AuthSession.useAuthRequest(
		{
			clientId: "ELu52KcgYsycBudtpOXySYDJREGMiK2o",
			redirectUri,
			scopes: ["identity"],
		},
		{
			authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
			tokenEndpoint: "https://api.twitter.com/2/oauth2/token",
		}
	);

	const request = result[0];
	const response = result[1];
	const promptAsync =
		result[2] as () => Promise<AuthSession.AuthSessionResult>;

	useEffect(() => {
		if (response?.type === "success") {
			const { oauth_token, oauth_token_secret } = response.params;

			const credential = TwitterAuthProvider.credential(
				oauth_token,
				oauth_token_secret
			);
			signInWithCredential(auth, credential)
				.then((result) => {
					console.log("User signed in:", result.user);
				})
				.catch((error) => {
					console.error("Error during sign-in:", error);
				});
		}
	}, [response]);

	return [request, response, promptAsync];
};

const LoginScreen = () => {
	const [promptAsync] = useTwitter();

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { width } = useWindowDimensions();
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

	return (
		<SafeAreaView style={styles.container}>
			<AnimatedPressable
				entering={FadeInDown.delay(100)}
				onPress={() => {
					navigation.navigate("Home");
				}}
				style={[styles.buttonContainer, { width: width * 0.8 }]}
			>
				<Text style={styles.text}>Ener Without Sign In</Text>
			</AnimatedPressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		backgroundColor: "#1c6cce",
		alignItems: "center",
		paddingVertical: 22,
		borderRadius: 40,
	},
	text: {
		color: "#fff",
		fontSize: 17,
	},
});

export default LoginScreen;
