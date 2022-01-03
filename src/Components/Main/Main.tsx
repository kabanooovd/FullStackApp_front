import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllUsers } from "./AllUsers/AllUsers";
import mainContentStyles from "./Main.module.css";

export const Main = () => {
	return (
		<div className={mainContentStyles.mainContainer}>
			<Routes>
				<Route path="/" element={<AllUsers />} />
			</Routes>
		</div>
	);
};
