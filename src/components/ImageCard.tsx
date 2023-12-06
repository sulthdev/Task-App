import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Photo } from "../../types/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

type Props = {
	item: Photo;
	index: number;
};

const ImageCard = ({ item, index }: Props) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<Animated.View
			entering={FadeInDown.delay(150 * index)}
			style={styles.animatedView}
		>
			<Pressable
				style={styles.cardContainer}
				onPress={() => {
					navigation.navigate("ImageFeed", { item: item });
				}}
			>
				<Animated.Image
					sharedTransitionTag={item.title}
					source={{ uri: item.url }}
					style={styles.photo}
				/>
				<Text style={styles.title}>{item.title}</Text>
			</Pressable>
		</Animated.View>
	);
};

export default ImageCard;

const styles = StyleSheet.create({
	animatedView: {
		flex: 1,
	},
	cardContainer: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 12,
	},
	photo: {
		width: "100%",
		height: 150,
		borderRadius: 7,
		resizeMode: "cover",
		marginBottom: 9,
	},
	title: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "400",
	},
});
