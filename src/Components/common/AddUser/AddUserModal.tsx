import { Button, Input, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../bll/allUsersReducer";
import { LoadingMode_Type } from "../../../bll/mainAppReducer";
import { AppRootStateType } from "../../../bll/store";
import { Create_Person_type } from "../../../dal/personApi";

export const AddUserModal = ({
	addUser,
	setAddUser,
}: {
	addUser: boolean;
	setAddUser: (addUser: boolean) => void;
}) => {
	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	const despatch = useDispatch();

	const [selectedFile, setSelectedFile] = React.useState<File | undefined>(
		undefined
	);
	console.log(selectedFile);
	const formik = useFormik<Omit<Create_Person_type, "photo">>({
		initialValues: {
			name: "",
			profession: "",
			age: +"",
			experience: "",
			price: +"",
			isFree: false,
			rating: 0,
		},
		onSubmit: (values) => {
			despatch(createUser({ ...values, photo: selectedFile }));
			formik.resetForm();
			setAddUser(false);
		},
	});

	const onLoadedPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			setSelectedFile(e.target.files[0]);
		}
	};

	return (
		<div>
			<Modal
				title={"Add new user"}
				centered
				visible={addUser}
				footer={[
					<Button key="back" onClick={() => setAddUser(false)}>
						Close
					</Button>,
				]}
			>
				<div>
					<form onSubmit={formik.handleSubmit}>
						<div style={{ margin: "20px 0" }}>
							<div>Insert name...</div>
							<Input
								type="text"
								id="name"
								{...formik.getFieldProps("name")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert profession...</div>
							<Input
								type="text"
								id="profession"
								{...formik.getFieldProps("profession")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert age...</div>
							<Input
								type="number"
								id="age"
								{...formik.getFieldProps("age")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert your experience...</div>
							<Input
								type="text"
								id="experience"
								{...formik.getFieldProps("experience")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert your expected wage...</div>
							<Input
								type="number"
								id="price"
								{...formik.getFieldProps("price")}
								required
							/>
						</div>
						<div style={{ margin: "20px 0" }}>
							<div>Insert your photo...</div>
							<input type="file" id="photo" onChange={onLoadedPhoto} />
						</div>
						<Row>
							<div style={{ margin: 20 }}>
								<Button
									type={"primary"}
									htmlType="submit"
									disabled={loadingMode === "loading"}
								>
									ADD USER
								</Button>
							</div>
						</Row>
					</form>
				</div>
			</Modal>
		</div>
	);
};
