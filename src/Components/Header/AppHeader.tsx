import React from "react";
import { Layout } from "antd";
import customStules from "./AppHeader.module.css";

const { Header } = Layout;

export const AppHeader = () => {
	return (
		<Header className="header" style={{ height: "10vh" }}>
			<span className={customStules.headerTitleStyles}>Find Team Mate</span>
		</Header>
	);
};
