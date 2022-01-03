import React from "react";
import customFotterStyles from "./AppFooter.module.css";
import { Layout } from "antd";

const { Footer } = Layout;

const footerTitleStyle = {
	color: "grey",
};

export const AppFooter = () => {
	return (
		<Footer className="header" style={{ height: "10vh" }}>
			<span style={footerTitleStyle}>Footer</span>
		</Footer>
	);
};
