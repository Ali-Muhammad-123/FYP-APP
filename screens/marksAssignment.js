import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native";
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
import { URLContext } from "../contexts/URLProvider";

function MarksAssignment({ route, navigation }) {
	const { panel, setPanel } = useContext(AuthContext);
	const { url, setUrl } = useContext(URLContext);

	const { group } = route.params;
	const [studentOne, setStudentOne] = useState();
	const [studentTwo, setStudentTwo] = useState();
	const [activePanel, setActivePanel] = useState(1);
	const [activeExam, setActiveExam] = useState(null);
	const [remarksOne, setRemarksOne] = useState(null);
	const [presentationOne, setPresentationOne] = useState(null);
	const [codeOne, setCodeOne] = useState(null);
	const [erdOne, setErdOne] = useState(null);
	const [srsOne, setSrsOne] = useState(null);
	const [formattingOne, setFormattingOne] = useState(0);
	const [remarksTwo, setRemarksTwo] = useState(null);
	const [presentationTwo, setPresentationTwo] = useState(null);
	const [codeTwo, setCodeTwo] = useState(null);
	const [erdTwo, setErdTwo] = useState(null);
	const [srsTwo, setSrsTwo] = useState(null);
	const [formattingTwo, setFormattingTwo] = useState(0);

	useFocusEffect(
		useCallback(() => {
			getMarks();
		}, [])
	);

	const getMarks = async () => {
		await axios({
			method: "GET",
			url: `${url}/activeExam`,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then(async (resp) => {
				setActiveExam(resp.data.activeExam.activeExam);

				await axios({
					method: "GET",
					url: `${url}/user`,
					params: { id: group.studentOne },
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
					.then((res) => {
						setStudentOne(res.data.user);
						setActivePanel(res.data.user);
						setRemarksOne(
							res.data.user[resp.data.activeExam.activeExam].remarks
						);
						setPresentationOne(
							res.data.user[
								resp.data.activeExam.activeExam
							].presentation.toString()
						);

						setCodeOne(
							res.data.user[resp.data.activeExam.activeExam].code.toString()
						);
						setErdOne(
							res.data.user[resp.data.activeExam.activeExam].erd.toString()
						);
						setSrsOne(
							res.data.user[resp.data.activeExam.activeExam].srs.toString()
						);
						setFormattingOne(
							res.data.user[
								resp.data.activeExam.activeExam
							].formatting.toString()
						);
					})
					.catch((err) => console.log(err));
				await axios({
					method: "GET",
					url: `${url}/user`,
					params: { id: group.studentTwo },
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
					.then((res) => {
						setStudentTwo(res.data.user);

						setRemarksTwo(
							res.data.user[resp.data.activeExam.activeExam].remarks.toString()
						);
						setPresentationTwo(
							res.data.user[
								resp.data.activeExam.activeExam
							].presentation.toString()
						);
						setCodeTwo(
							res.data.user[resp.data.activeExam.activeExam].code.toString()
						);
						setErdTwo(
							res.data.user[resp.data.activeExam.activeExam].erd.toString()
						);
						setSrsTwo(
							res.data.user[resp.data.activeExam.activeExam].srs.toString()
						);
						setFormattingTwo(
							res.data.user[
								resp.data.activeExam.activeExam
							].formatting.toString()
						);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	async function submitMarks() {
		activePanel === studentOne
			? await axios({
					method: "POST",
					url: `${url}/assignGrade`,
					params: {
						id: studentOne[activeExam]._id,
					},
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},

					data: {
						remarks: remarksOne,
						presentation: Number(presentationOne),
						code: Number(codeOne),
						erd: Number(erdOne),
						srs: Number(srsOne),
						formatting: Number(formattingOne),
					},
			  })
					.then(() => {
						console.log("succesws");
						Alert.alert(`Successful!`, `Marks of ${studentOne.name} posted`, [
							{
								text: "Ok",
								onPress: () => console.log("Ok pressed"),
							},
						]);
					})
					.catch((err) => {
						console.log(err);
					})
			: await axios({
					method: "POST",
					url: `${url}/assignGrade`,
					params: {
						id: studentTwo[activeExam]._id,
					},
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},

					data: {
						remarks: remarksTwo,
						presentation: Number(presentationTwo),
						code: Number(codeTwo),
						erd: Number(erdTwo),
						srs: Number(srsTwo),
						formatting: Number(formattingTwo),
					},
			  })
					.then(() =>
						Alert.alert(`Successful!`, `Marks of ${studentTwo.name} posted`, [
							{
								text: "Ok",
								onPress: () => console.log("Ok pressed"),
							},
						])
					)
					.catch((err) => {
						console.log(err);
					});
	}
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff",
				padding: 20,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "700",
						paddingBottom: 15,
						textAlign: "center",
					}}
				>
					{group?.projectTitle}
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Pressable
					style={
						activePanel === studentOne
							? {
									borderWidth: 2,
									borderRadius: 10,
									paddingHorizontal: 10,
									paddingVertical: 5,
									backgroundColor: "#7aceff",
							  }
							: {
									borderWidth: 2,
									borderRadius: 10,
									paddingHorizontal: 10,
									paddingVertical: 5,
							  }
					}
					onPress={() => {
						setActivePanel(studentOne);
					}}
				>
					<Text style={{ textAlign: "center" }}> {studentOne?.name}</Text>
				</Pressable>
				<Pressable
					style={
						activePanel === studentTwo
							? {
									borderWidth: 2,
									borderRadius: 10,
									paddingHorizontal: 10,
									paddingVertical: 5,
									backgroundColor: "#7aceff",
							  }
							: {
									borderWidth: 2,
									borderRadius: 10,
									paddingHorizontal: 10,
									paddingVertical: 5,
							  }
					}
					onPress={() => setActivePanel(studentTwo)}
				>
					<Text style={{ textAlign: "center" }}> {studentTwo?.name}</Text>
				</Pressable>
			</View>
			<ScrollView>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						backgroundColor: "#fff",
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "700",
							paddingTop: 10,
							textAlign: "center",
						}}
					>
						{activePanel?.name}
					</Text>
					<View style={{ flex: 1, flexDirection: "column" }}>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
							}}
						>
							<Text>Remarks:</Text>
							<TextInput
								style={{
									borderWidth: 1,
									borderRadius: 5,
									marginLeft: 10,
									padding: 5,
									flex: 1,
								}}
								numberOfLines={6}
								multiline={true}
								onChangeText={(text) => {
									activePanel === studentOne
										? setRemarksOne(text)
										: setRemarksTwo(text);
								}}
								value={activePanel === studentOne ? remarksOne : remarksTwo}
							/>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>Working Demo of Project: </Text>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={{
										borderWidth: 1,
										borderRadius: 5,
										marginLeft: 10,
										padding: 5,
										width: 50,
									}}
									onChangeText={(text) => {
										if (Number(text.replace(/[^0-9]/g, "")) <= 15)
											activePanel === studentOne
												? setPresentationOne(text.replace(/[^0-9]/g, ""))
												: setPresentationTwo(text.replace(/[^0-9]/g, ""));
									}}
									value={
										activePanel === studentOne
											? presentationOne
											: presentationTwo
									}
								/>
								<Text
									style={{ paddingLeft: 10, textAlign: "center", fontSize: 25 }}
								>
									/ 15
								</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>
								Test Cases, Design and Development:
							</Text>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={{
										borderWidth: 1,
										borderRadius: 5,
										marginLeft: 10,
										padding: 5,
										width: 50,
									}}
									onChangeText={(text) => {
										if (Number(text.replace(/[^0-9]/g, "")) <= 10)
											activePanel === studentOne
												? setCodeOne(text.replace(/[^0-9]/g, ""))
												: setCodeTwo(text.replace(/[^0-9]/g, ""));
									}}
									value={activePanel === studentOne ? codeOne : codeTwo}
								/>
								<Text
									style={{ paddingLeft: 10, textAlign: "center", fontSize: 25 }}
								>
									/ 10
								</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>Questions and Answers:</Text>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={{
										borderWidth: 1,
										borderRadius: 5,
										marginLeft: 10,
										padding: 5,
										width: 50,
									}}
									onChangeText={(text) => {
										if (Number(text.replace(/[^0-9]/g, "")) <= 5)
											activePanel === studentOne
												? setErdOne(text.replace(/[^0-9]/g, ""))
												: setErdTwo(text.replace(/[^0-9]/g, ""));
									}}
									value={activePanel === studentOne ? erdOne : erdTwo}
								/>
								<Text
									style={{ paddingLeft: 25, textAlign: "center", fontSize: 25 }}
								>
									/ 5
								</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>Documentation:</Text>
							<View style={{ flexDirection: "row" }}>
								<TextInput
									style={{
										borderWidth: 1,
										borderRadius: 5,
										marginLeft: 10,
										padding: 5,
										width: 50,
									}}
									onChangeText={(text) => {
										if (Number(text.replace(/[^0-9]/g, "")) <= 10)
											activePanel === studentOne
												? setSrsOne(text.replace(/[^0-9]/g, ""))
												: setSrsTwo(text.replace(/[^0-9]/g, ""));
									}}
									value={activePanel === studentOne ? srsOne : srsTwo}
								/>
								<Text
									style={{ paddingLeft: 10, textAlign: "center", fontSize: 25 }}
								>
									/ 10
								</Text>
							</View>
						</View>
						{/* <View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>
								TOC / Formatting / Headings:
							</Text>
							<TextInput
								style={{
									borderWidth: 1,
									borderRadius: 5,
									marginLeft: 10,
									padding: 5,
									width: 50,
								}}
								onChangeText={(text) => {
									activePanel === studentOne
										? setFormattingOne(text.replace(/[^0-9]/g, ""))
										: setFormattingTwo(text.replace(/[^0-9]/g, ""));
								}}
								value={
									activePanel === studentOne ? formattingOne : formattingTwo
								}
							/>
						</View> */}
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 10,
								justifyContent: "space-between",
							}}
						>
							<Text style={{ maxWidth: 150 }}>Total:</Text>
							<Text
								style={{
									marginLeft: 10,
									padding: 5,
									fontSize: 30,
									fontWeight: 800,
								}}
							>
								{activePanel === studentOne
									? Number(presentationOne) +
									  Number(codeOne) +
									  Number(erdOne) +
									  Number(srsOne) +
									  Number(formattingOne)
									: Number(presentationTwo) +
									  Number(codeTwo) +
									  Number(erdTwo) +
									  Number(srsTwo) +
									  Number(formattingTwo)}
							</Text>
						</View>
						<Pressable style={styles.buttonStyle} onPress={() => submitMarks()}>
							<Text>Submit</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
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

export default MarksAssignment;
