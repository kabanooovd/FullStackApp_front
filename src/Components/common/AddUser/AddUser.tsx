import { Button } from "antd";
import React from "react";
import { AddUserModal } from "./AddUserModal";

export const AddUser = () => {
	const [addUser, setAddUser] = React.useState<boolean>(false);
	return (
		<div style={{ margin: 50 }}>
			<Button type="primary" onClick={() => setAddUser(true)}>
				ADD USER
			</Button>
			<AddUserModal addUser={addUser} setAddUser={setAddUser} />
		</div>
	);
};
