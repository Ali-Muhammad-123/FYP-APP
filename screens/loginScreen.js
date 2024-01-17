import axios from "axios";
import React, { useContext, useState } from "react";
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { URLContext } from "../contexts/URLProvider";

function LoginScreen({ navigation }) {
	const [error, setError] = useState("");
	const [panelNumber, setPanelNumber] = useState("");
	const { url, setUrl } = useContext(URLContext);
	const { panel, setPanel } = useContext(AuthContext);

	const [pass, setPass] = useState("");

	async function login() {
		const res = await axios({
			method: "GET",
			url: `${url}/panel`,
			params: {
				name: panelNumber,
				password: pass,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).catch((err) => {
			console.log(err);
			setError("Please check network connection and try again");
		});

		if (res) {
			setPanel(panelNumber);
			// console.log(res?.data.panel[0].groups);
			navigation.navigate("Group Listing", {
				groups: res?.data.panel[0].groups,
			});
		}
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
				<Text>Panel Number</Text>
				<TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => {
						setPanelNumber(text.replace(/[^0-9]/g, ""));
					}}
					value={panelNumber}
					placeholder={"Enter Panel Number"}
				/>
			</View>
			<View style={styles.textBox}>
				<Text>Password</Text>
				<TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => {
						setPass(text);
					}}
					value={pass}
					placeholder={"Enter Password"}
				/>
			</View>
			<Pressable style={styles.buttonStyle} onPress={() => login()}>
				<Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
					Login
				</Text>
			</Pressable>
			<Text style={styles.errorStyle}>{error}</Text>
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

export default LoginScreen;
