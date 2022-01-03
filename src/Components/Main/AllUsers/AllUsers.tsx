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

	const [pagState, setPagState] = React.useState({
		minValue: 0,
		maxValue: 5,
	});

	const handleChange = (value: number) => {
		setPagState({
			minValue: (value - 1) * 5,
			maxValue: value * 5,
		});
	};

	const mappedAllUsers =
		allUsers &&
		allUsers.length > 0 &&
		allUsers.slice(pagState.minValue, pagState.maxValue).map((person) => {
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
		});

	return (
		<div className={customStyles.allUsersContainer}>
			<Title style={{ marginTop: 20 }}>Oewr friends</Title>
			<div className={customStyles.usersListStyles}>{mappedAllUsers}</div>
			<Pagination
				style={{ margin: 40 }}
				defaultCurrent={1}
				defaultPageSize={5}
				onChange={handleChange}
				total={allUsers.length}
			/>
		</div>
	);
};
