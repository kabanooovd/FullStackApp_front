import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getUsetDataAfterRefresh } from "../../bll/authReducer";
import { AllUsers } from "./AllUsers/AllUsers";
import mainContentStyles from "./Main.module.css";

export enum PATH {
	ALLUSERS = "/",
}

export const Main = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getUsetDataAfterRefresh);
	}, [dispatch]);

	return (
		<div className={mainContentStyles.mainContainer}>
			<Routes>
				<Route path={PATH.ALLUSERS} element={<AllUsers />} />
			</Routes>
		</div>
	);
};
