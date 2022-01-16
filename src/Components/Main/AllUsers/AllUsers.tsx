import React from "react";
import customStyles from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFromBack, updateUser } from "../../../bll/allUsersReducer";
import { AppRootStateType } from "../../../bll/store";
import { Person_Type } from "../../../dal/personApi";
import { PersonCard } from "./PersonCard/PersonCard";
import { Pagination, Typography } from "antd";
import { LoadingMode_Type } from "../../../bll/mainAppReducer";
import { getChosenUser } from "../../../bll/currentUserReducer";
import { PersonModalCard } from "../../common/PersonModalCard";

const { Title } = Typography;

export const AllUsers = () => {
	const dispatch = useDispatch();

	const [showUser, setShowUser] = React.useState<boolean>(false);

	const chosenUser = useSelector<AppRootStateType, Person_Type | undefined>(
		(state) => state.foundUser.chosenUser
	);

	React.useEffect(() => {
		if (chosenUser) {
			setShowUser(true);
		}
	}, []);

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

	const foundUserHandler = (userId: string) => {
		dispatch(getChosenUser(userId));
		setShowUser(true);
	};

	const onHireHandler = (isFree: boolean) => {
		if (chosenUser) {
			const request = { ...chosenUser, isFree: !isFree };
			dispatch(updateUser(request));
			setShowUser(false);
		}
	};

	const mappedAllUsers =
		allUsers &&
		allUsers.length > 0 &&
		allUsers.slice(pagState.minValue, pagState.maxValue).map((person) => {
			return (
				<div key={person._id}>
					<PersonCard
						_id={person._id}
						name={person.name}
						profession={person.profession}
						price={person.price}
						rating={person.rating}
						photo={person.photo ? person.photo : undefined}
						loadingMode={loadingMode}
						foundUserHandler={foundUserHandler}
					/>
				</div>
			);
		});

	return (
		<div className={customStyles.allUsersContainer}>
			<Title style={{ marginTop: 20 }}>Oewr friends</Title>
			{showUser && chosenUser && (
				<PersonModalCard
					isOpened={showUser}
					setIsOpened={setShowUser}
					name={chosenUser.name}
					photo={chosenUser.photo}
					profession={chosenUser.profession}
					experience={chosenUser.experience}
					age={chosenUser.age}
					rating={chosenUser.rating}
					price={chosenUser.price}
					onHireHandler={onHireHandler}
					isFree={chosenUser.isFree}
					id={chosenUser._id}
				/>
			)}
			<div className={customStyles.usersListStyles}>{mappedAllUsers ? mappedAllUsers : <h1>No users yet...</h1>	}</div>
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
