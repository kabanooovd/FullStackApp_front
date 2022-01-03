import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const headerTitleStyles = {
	color: "snow",
};

export const AppHeader = () => {
	return (
		<Header className="header">
			<span style={headerTitleStyles}>Find Team Mate</span>
		</Header>
	);
};
