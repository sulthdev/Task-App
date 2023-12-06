import {
	View,
	Text,
	useWindowDimensions,
	StyleSheet,
	Button,
	PanResponder,
} from "react-native";
import React from "react";
import { RootStackParamList } from "../navigator/RootNavigator";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ImageFeedScreenRouteProp = RouteProp<RootStackParamList, "ImageFeed">;
type Props = {
	route: ImageFeedScreenRouteProp;
};

const ImageFeedScreen = ({ route }: Props) => {
	const { item } = route.params;
	const { width } = useWindowDimensions();

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<Animated.Image
				sharedTransitionTag={item.title}
				source={{ uri: item.url }}
				style={{ height: width, width: width }}
			/>
			<Text style={styles.title}>{item.title}</Text>
			<Button
				title="Go Back"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		padding: 18,
		fontSize: 18,
		fontWeight: "600",
	},
});
export default ImageFeedScreen;
