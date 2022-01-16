import React from "react";
import { Button, Input, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../bll/authReducer";
import { LoadingMode_Type } from "../../bll/mainAppReducer";
import { AppRootStateType } from "../../bll/store";
import { Login_Data_types } from "../../dal/authApi";
import { NavLink } from "react-router-dom";

export const Login = ({
	loginMode,
	setLoginMode,
	setIsRegisterModal,
}: {
	loginMode: boolean;
	setLoginMode: (loginMode: boolean) => void;
	setIsRegisterModal: (isRegisterModal: boolean) => void;
}) => {
	const despatch = useDispatch();

	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	const formik = useFormik<Login_Data_types>({
		initialValues: {
			userName: "",
			password: "",
		},
		onSubmit: (values) => {
			despatch(login(values));
			formik.resetForm();
			setLoginMode(false);
		},
	});

	const regButton = () => {
		setLoginMode(false);
		setIsRegisterModal(true);
	};

	return (
		<div>
			<Modal
				title={"Add new user"}
				centered
				visible={loginMode}
				footer={[
					<Button key="back" onClick={() => setLoginMode(false)}>
						Close
					</Button>,
				]}
			>
				<div>
					<form onSubmit={formik.handleSubmit}>
						<div style={{ margin: "20px 0" }}>
							<div>Insert profile name...</div>
							<Input
								type="text"
								id="userName"
								{...formik.getFieldProps("userName")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert password...</div>
							<Input
								type="password"
								id="password"
								{...formik.getFieldProps("password")}
								required
							/>
						</div>
						<Row>
							<div
								style={{
									margin: 20,
									display: "flex",
									width: "100%",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Button
									type={"primary"}
									htmlType="submit"
									disabled={loadingMode === "loading"}
								>
									Login
								</Button>
								<Button
									disabled={loadingMode === "loading"}
									onClick={regButton}
								>
									Registration
								</Button>
							</div>
						</Row>
					</form>
				</div>
			</Modal>
		</div>
	);
};
