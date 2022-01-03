import React from "react";
import { useDispatch } from "react-redux";
import { getAllUserFromBack } from "../../../bll/allUsersReducer";

export const AllUsers = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getAllUserFromBack);
	}, []);

	return <div>All Users +++</div>;
};
