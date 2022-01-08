import { Button, Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../bll/allUsersReducer";
import { LoadingMode_Type } from "../../../bll/mainAppReducer";
import { AppRootStateType } from "../../../bll/store";
import { Create_Person_type, Person_Type } from "../../../dal/personApi";

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
		// const formik = useFormik<Create_Person_type>({
		initialValues: {
			name: "",
			profession: "",
			age: +"",
			experience: "",
			price: +"",
			isFree: false,
			rating: +"",
			// photo: undefined,
		},
		onSubmit: (values) => {
			despatch(createUser({ ...values, photo: selectedFile }));
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
						<Input
							style={{ margin: "20px 0" }}
							type="text"
							id="name"
							{...formik.getFieldProps("name")}
							placeholder="Insert name"
							required
						/>
						<Input
							style={{ margin: "20px 0" }}
							type="text"
							id="profession"
							{...formik.getFieldProps("profession")}
							placeholder="Insert profession"
							required
						/>
						<Input
							style={{ margin: "20px 0" }}
							type="number"
							id="age"
							{...formik.getFieldProps("age")}
							placeholder="Insert age"
							required
						/>
						<Input
							style={{ margin: "20px 0" }}
							type="text"
							id="experience"
							{...formik.getFieldProps("experience")}
							placeholder="Insert experience"
							required
						/>
						<Input
							style={{ margin: "20px 0" }}
							type="number"
							id="price"
							{...formik.getFieldProps("price")}
							placeholder="Insert price"
							required
						/>
						<Input
							style={{ margin: "20px 0" }}
							type="number"
							id="rating"
							{...formik.getFieldProps("rating")}
							placeholder="Insert rating"
							required
						/>
						<input
							style={{ margin: "20px 0" }}
							type="file"
							id="photo"
							// {...formik.getFieldProps("photo")}
							onChange={onLoadedPhoto}
							// value={selectedFile}
							// onBlur={formik.handleBlur}
							placeholder="Insert image"
						/>
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
