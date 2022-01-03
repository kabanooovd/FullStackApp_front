import React from "react";
import { Layout, Spin } from "antd";
import customStules from "./AppHeader.module.css";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../bll/store";
import { LoadingMode_Type } from "../../bll/mainAppReducer";

const { Header } = Layout;

export const AppHeader = () => {
	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	return (
		<div style={{ position: "relative" }}>
			<Header className="header" style={{ height: "10vh", marginBottom: 60 }}>
				<span className={customStules.headerTitleStyles}>Find Team Mate</span>
				{loadingMode === "loading" && (
					<Spin tip="Loading..." className={customStules.spinnerPosition} />
				)}
			</Header>
		</div>
	);
};
