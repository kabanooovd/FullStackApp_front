import React from "react";
import { Route, Routes } from "react-router-dom";
import { personApi } from "../../dal/personApi";
import { AllUsers } from "./AllUsers/AllUsers";
import mainContentStyles from "./Main.module.css";

export enum PATH {
	ALLUSERS = "/",
}

export const Main = () => {
	const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
		undefined
	);

	console.log(selectedFile);

	const onChangeHanfler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const cleckHandler = () => {
		if (selectedFile) {
			personApi
				.mkImg(selectedFile)
				.then(() => {
					alert("gooood");
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	};

	return (
		<div className={mainContentStyles.mainContainer}>
			<input type={"file"} onChange={onChangeHanfler} />
			<button onClick={cleckHandler}>click</button>
			<Routes>
				<Route path={PATH.ALLUSERS} element={<AllUsers />} />
			</Routes>
		</div>
	);
};
