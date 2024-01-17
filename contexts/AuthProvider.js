import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();
function AuthProvider({ children }) {
	const [panel, setPanel] = useState("");
	useEffect(
		() => async () => {
			try {
				const value = await AsyncStorage.getItem("panel");
				if (value !== null) {
					setPanel(value);
				}
			} catch (e) {}
		},
		[]
	);

	return (
		<AuthContext.Provider value={{ panel, setPanel }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
