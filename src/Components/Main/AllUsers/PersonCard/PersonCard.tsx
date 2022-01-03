import React from "react";
import { Card } from "antd";

const { Meta } = Card;

export const PersonCard = ({
	photo,
	name,
	profession,
	price,
	_id,
}: {
	photo: string | undefined;
	name: string;
	profession: string;
	price: number;
	_id: string;
}) => {
	return (
		<Card
			hoverable
			style={{ width: 240, margin: 20 }}
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
		>
			<Meta title={`${name}, ${profession}`} description={price.toString()} />
		</Card>
	);
};
