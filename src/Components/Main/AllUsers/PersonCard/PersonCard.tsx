import React from "react";
import { Button, Card, Rate } from "antd";
import { Divider } from "antd";
import Title from "antd/lib/skeleton/Title";
import { LoadingMode_Type } from "../../../../bll/mainAppReducer";
import { currencyFormat } from "../../../../utils/currencyFormat";

const { Meta } = Card;

export const PersonCard = ({
	photo,
	name,
	profession,
	price,
	rating,
	loadingMode,
	_id,
	foundUserHandler,
}: {
	photo: string | undefined;
	name: string;
	profession: string;
	price: number;
	rating: number;
	loadingMode: LoadingMode_Type;
	_id: string;
	foundUserHandler: (_id: string) => void;
}) => {
	return (
		<Card
			hoverable
			style={{
				width: 240,
				margin: 20,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
			loading={loadingMode === "loading"}
			cover={
				<img
					alt={name}
					src={
						photo
							? `http://localhost:5000/${photo}`
							: "https://i.ytimg.com/vi/J0XdmEDVfZI/hqdefault_live.jpg"
					}
				/>
			}
			extra={<Rate allowHalf defaultValue={rating / 2} />}
		>
			<Divider>{name}</Divider>
			<Meta title={profession} description={currencyFormat(price)} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					padding: "20px 0 0 0",
				}}
			>
				<Button
					type="primary"
					onClick={() => foundUserHandler(_id)}
				>
					SHOW PERSON
				</Button>
			</div>
		</Card>
	);
};
