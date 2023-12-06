import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Platform,
	ActivityIndicator,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import { Photo } from "../../types/types";

type Props = {};

const HomeScreen = (props: Props) => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const response = await axios.get<{ photos: Photo[] }>(
					"https://api.slingacademy.com/v1/sample-data/photos"
				);

				setPhotos(response.data.photos);
				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				Alert.alert("Error fetching data:", error.toString());
			}
		};

		fetchPhotos();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{!isLoading ? (
				<FlatList
					showsVerticalScrollIndicator={false}
					data={photos}
					renderItem={({ item, index }) => (
						<ImageCard item={item} index={index} />
					)}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={styles.gridContainer}
					numColumns={2}
					columnWrapperStyle={{ gap: 12 }}
				/>
			) : (
				<ActivityIndicator size={30} />
			)}
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	gridContainer: {
		paddingHorizontal: 20,
		paddingVertical: Platform.OS === "android" ? 50 : 0,
	},
});
