import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/loginScreen";
import GroupListing from "./screens/groupListing";
import { AuthProvider } from "./contexts/AuthProvider";
import { URLProvider } from "./contexts/URLProvider";
import URLScreen from "./screens/urlScreen";
import MarksAssignment from "./screens/marksAssignment";
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<URLProvider>
				<AuthProvider>
					<Stack.Navigator initialRouteName="Base URL">
						{/* <Stack.Screen name="Base URL" component={URLScreen} /> */}
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Group Listing" component={GroupListing} />
						<Stack.Screen name="Marks Assignment" component={MarksAssignment} />
					</Stack.Navigator>
				</AuthProvider>
			</URLProvider>
		</NavigationContainer>
	);
}
