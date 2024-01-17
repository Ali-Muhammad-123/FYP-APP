import { createContext, useEffect, useState } from "react";
const URLContext = createContext();
function URLProvider({ children }) {
	// const [url, setUrl] = useState("https://zabfyp.dabbssolutions.org");
	const [url, setUrl] = useState("http://192.168.0.105:3001");

	return (
		<URLContext.Provider value={{ url, setUrl }}>
			{children}
		</URLContext.Provider>
	);
}

export { URLContext, URLProvider };
