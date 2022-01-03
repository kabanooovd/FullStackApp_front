import React from "react";
import customStyles from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFromBack } from "../../../bll/allUsersReducer";
import { AppRootStateType } from "../../../bll/store";
import { Person_Type } from "../../../dal/personApi";
import { PersonCard } from "./PersonCard/PersonCard";
import { Pagination, Typography } from "antd";
import { LoadingMode_Type } from "../../../bll/mainAppReducer";

const { Title } = Typography;

export const AllUsers = () => {
	const dispatch = useDispatch();

	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	React.useEffect(() => {
		dispatch(getAllUserFromBack);
	}, []);

	const allUsers = useSelector<AppRootStateType, Person_Type[]>(
		(state) => state.allUsers
	);

	const mappedAllUsers = allUsers.length
		? allUsers.map((person) => {
				return (
					<PersonCard
						key={person._id}
						_id={person._id}
						name={person.name}
						profession={person.profession}
						price={person.price}
						rating={person.rating}
						photo={person.photo ? person.photo : undefined}
						loadingMode={loadingMode}
					/>
				);
		  })
		: "No data";

	return (
		<div className={customStyles.allUsersContainer}>
			<Title style={{ marginTop: 20 }}>Oewr friends</Title>
			<div className={customStyles.usersListStyles}>{mappedAllUsers}</div>
			<Pagination defaultCurrent={1} total={allUsers.length} />
		</div>
	);
};
