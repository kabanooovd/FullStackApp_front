import React from "react";
import customStyles from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFromBack } from "../../../bll/allUsersReducer";
import { AppRootStateType } from "../../../bll/store";
import { Person_Type } from "../../../dal/personApi";
import { PersonCard } from "./PersonCard/PersonCard";
import { Typography } from "antd";

const { Title } = Typography;

export const AllUsers = () => {
	const dispatch = useDispatch();

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
						photo={person.photo ? person.photo : undefined}
					/>
				);
		  })
		: "No data";

	return (
		<div className={customStyles.allUsersContainer}>
			<Title>Oewr friends</Title>
			<div className={customStyles.usersListStyles}>{mappedAllUsers}</div>
		</div>
	);
};
