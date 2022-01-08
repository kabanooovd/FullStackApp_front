import { Button, Card, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setFoundUser } from "../../bll/currentUserReducer";
import { LoadingMode_Type } from "../../bll/mainAppReducer";
import { AppRootStateType } from "../../bll/store";
import Meta from "antd/lib/card/Meta";
import { currencyFormat } from "../../utils/currencyFormat";

export const PersonModalCard = ({
	isOpened,
	setIsOpened,
	name,
	photo,
	profession,
	experience,
	age,
	rating,
	price,
	onHireHandler,
	isFree,
	id,
}: {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
	name: string;
	photo: string | undefined;
	profession: string;
	experience: string | undefined;
	age: number | undefined;
	rating: number;
	price: number;
	onHireHandler: (isFree: boolean) => void;
	isFree: boolean;
	id: string;
}) => {
	const dispatch = useDispatch();

	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	const onCloseHandler = () => {
		setIsOpened(false);
		dispatch(setFoundUser(undefined));
	};

	const removeCurrentPerson = () => {
		setIsOpened(false);
		dispatch(removeUser(id));
	};

	return (
		<>
			<Modal
				title={name}
				centered
				visible={isOpened}
				footer={[
					<Button
						key="submit"
						type="primary"
						loading={loadingMode === "loading"}
						onClick={() => onHireHandler(isFree)}
						disabled={isFree}
					>
						Hire
					</Button>,
					<Button type="primary" danger onClick={removeCurrentPerson}>
						Remove
					</Button>,
					<Button key="back" onClick={onCloseHandler}>
						Close
					</Button>,
				]}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "30px 0",
					}}
				>
					<Image
						width={200}
						src={
							photo
								? `http://localhost:5000/${photo}`
								: "https://i.ytimg.com/vi/J0XdmEDVfZI/hqdefault_live.jpg"
						}
					/>
				</div>
				<Meta
					title={`${name}, ${profession}`}
					description={`${name} ${age && `is ${age} years old.`} Has ${
						experience ? experience : "0"
					} yaers of experience. Rating is ${rating} of 10. Expected wage is ${currencyFormat(
						price
					)}...`}
				/>
			</Modal>
		</>
	);
};
