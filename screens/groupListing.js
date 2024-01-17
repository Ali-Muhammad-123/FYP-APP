import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

function Item({ item, navigation }) {
	return (
		<View
			style={{
				marginBottom: 10,
				flex: 1,
				backgroundColor: "#ADD8E6",
				borderRadius: 10,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				borderWidth: 2,
				borderColor: "#729098",
			}}
		>
			<Text style={{ flex: 2, paddingVertical: 10, paddingHorizontal: 10 }}>
				{item.projectTitle}
			</Text>
			<Pressable
				style={{ flex: 1 }}
				onPress={() =>
					navigation.navigate("Marks Assignment", {
						group: item,
					})
				}
			>
				<View
					style={{
						backgroundColor: "#fff",
						padding: 10,
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
						flex: 1,
						justifyContent: "center",
					}}
				>
					<Text>Assign Marks</Text>
				</View>
			</Pressable>
		</View>
	);
}

function GroupLising({ route, navigation }) {
	const { panel, setPanel } = useContext(AuthContext);
	const { groups } = route.params;
	// useEffect(() => {
	// 	async () =>
	// 		setList(
	// 			await axios({
	// 				method: "GET",
	// 				url: `${baseUrl}/getGroups/${panel}`,
	// 			})
	// 		);
	// }, []);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff",
				justifyContent: "center",
				padding: 20,
			}}
		>
			<Text style={{ fontWeight: 800, fontSize: 18, textAlign: "center" }}>
				Panel {panel}
			</Text>
			<FlatList
				style={{ paddingTop: 10 }}
				data={groups}
				renderItem={({ item }) => <Item item={item} navigation={navigation} />}
				keyExtractor={(item) => item.id}
			/>

			{/* <Text style={styles.errorStyle}>{error}</Text> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	errorStyle: {
		fontSize: 16,
		fontWeight: "500",
		color: "#FF0000",
		textAlign: "center",
		marginTop: 20,
	},
	textInputStyle: {
		borderWidth: 1,
		borderRadius: 10,
		width: "100%",
		height: 40,
		marginTop: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	textBox: {
		paddingVertical: 5,
	},
	buttonStyle: {
		backgroundColor: "#ADD8E6",
		width: "100%",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginTop: 20,
		borderWidth: 2,
		borderColor: "#59C5E8",
	},
});

export default GroupLising;
