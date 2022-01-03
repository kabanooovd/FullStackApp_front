import React from "react";
import "./App.css";
import { Main } from "./Components/Main/Main";
import { AppHeader } from "./Components/Header/AppHeader";
import { AppFooter } from "./Components/Footer/AppFooter";

function App() {
	return (
		<>
			<AppHeader />
			<Main />
			<AppFooter />
		</>
	);
}

export default App;
