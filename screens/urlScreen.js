import React, { useContext, useState } from "react";
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { URLContext } from "../contexts/URLProvider";

function URLScreen({ navigation }) {
	const { url, setUrl } = useContext(URLContext);

	async function login() {
		await axios({
			method: "GET",
			url: `${baseUrl}/getGroups/${panel}`,
		});
	}
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff",
				justifyContent: "center",
				padding: 20,
			}}
		>
			<View style={styles.textBox}>
				<Text>Base URL</Text>
				<TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => {
						setUrl(text);
					}}
					value={url}
					placeholder={"Enter Base URL"}
				/>
			</View>

			<Pressable
				style={styles.buttonStyle}
				onPress={() => {
					navigation.navigate("Login");
				}}
			>
				<Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
					Enter
				</Text>
			</Pressable>
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

export default URLScreen;
