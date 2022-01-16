import React from "react";
import { Button, Layout, Spin } from "antd";
import customStules from "./AppHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../bll/store";
import { LoadingMode_Type } from "../../bll/mainAppReducer";
import { AddUserModal } from "../common/AddUser/AddUserModal";
import { Login } from "../common/Login";
import { RoleTypes } from "../../utils/commonTypes";
import { setLoggedUserData } from "../../bll/authReducer";
import { LocalMemoManager } from "../../utils/localMemoManager";

const { Header } = Layout;

export const AppHeader = () => {
	const dispatch = useDispatch();

	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	const currentRole = useSelector<AppRootStateType, RoleTypes | undefined>(
		(state) => state.auth.role
	);

	const [isLoginModal, setIsLoginModal] = React.useState<boolean>(false);
	const [isRgisterModal, setIsRegisterModal] = React.useState<boolean>(false);

	return (
		<div style={{ position: "relative" }}>
			<Header
				className="header"
				style={{
					height: "10vh",
					marginBottom: 60,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<span className={customStules.headerTitleStyles}>Find Team Mate</span>
					{currentRole ? (
						<Button
							onClick={() => {
								dispatch(setLoggedUserData({ userName: "", role: undefined }));
								const lmm = new LocalMemoManager();
								lmm.removeToken();
							}}
						>
							Logout
						</Button>
					) : (
						<Button onClick={() => setIsLoginModal(true)}>Login</Button>
					)}
				</div>

				<Login
					loginMode={isLoginModal}
					setLoginMode={setIsLoginModal}
					setIsRegisterModal={setIsRegisterModal}
				/>
				<AddUserModal
					addUser={isRgisterModal}
					setAddUser={setIsRegisterModal}
					setIsLoginModal={setIsLoginModal}
				/>
				{loadingMode === "loading" && (
					<Spin tip="Loading..." className={customStules.spinnerPosition} />
				)}
			</Header>
		</div>
	);
};
