import { Button, Card } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFoundUser } from "../../bll/currentUserReducer";
import { LoadingMode_Type } from "../../bll/mainAppReducer";
import { AppRootStateType } from "../../bll/store";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";
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
}) => {
	const dispatch = useDispatch();

	const loadingMode = useSelector<AppRootStateType, LoadingMode_Type>(
		(state) => state.appState.loadingMode
	);

	const onCloseHandler = () => {
		setIsOpened(false);
		dispatch(setFoundUser(undefined));
	};

	return (
		<>
			<Modal
				title={name}
				centered
				visible={isOpened}
				footer={[
					<Button key="back" onClick={onCloseHandler}>
						Close
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={loadingMode === "loading"}
						onClick={() => onHireHandler(isFree)}
						disabled={!isFree}
					>
						Hire
					</Button>,
				]}
			>
				<Card
					style={{
						width: 300,
					}}
					cover={
						<img
							alt="example"
							src={
								photo
									? `http://localhost:5000/${photo}`
									: "https://i.ytimg.com/vi/J0XdmEDVfZI/hqdefault_live.jpg"
							}
						/>
					}
					actions={[
						<SettingOutlined key="setting" />,
						<EditOutlined key="edit" />,
						<EllipsisOutlined key="ellipsis" />,
					]}
				>
					<Meta
						avatar={
							<Avatar
								src={
									photo
										? `http://localhost:5000/${photo}`
										: "https://i.ytimg.com/vi/J0XdmEDVfZI/hqdefault_live.jpg"
								}
							/>
						}
						title={`${name}, ${profession}`}
						description={`${name} ${age && `is ${age} years old.`} Has ${
							experience ? experience : "0"
						} yaers of experience. Rating is ${rating} of 10. Expected wage is ${currencyFormat(
							price
						)}...`}
					/>
				</Card>
			</Modal>
		</>
	);
};
