import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllUsers } from "./AllUsers/AllUsers";
import mainContentStyles from "./Main.module.css";

export enum PATH {
	ALLUSERS = "/",
}

export const Main = () => {
	return (
		<div className={mainContentStyles.mainContainer}>
			<Routes>
				<Route path={PATH.ALLUSERS} element={<AllUsers />} />
			</Routes>
		</div>
	);
};
