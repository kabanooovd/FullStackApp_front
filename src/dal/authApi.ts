import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/auth/",
});

export const authAPI = {
	registration(payload: Create_Person_type) {
		if (payload.photo) {
			const formData = new FormData();
			formData.append("name", payload.name);
			formData.append("userName", payload.userName);
			formData.append("profession", payload.profession);
			payload.age && formData.append("age", String(payload.age));
			payload.experience && formData.append("experience", payload.experience);
			formData.append("price", String(payload.price));
			formData.append("isFree", String(payload.isFree));
			formData.append("rating", String(payload.rating));
			formData.append("password", payload.password);
			formData.append("photo", payload.photo);
			return instance.post("/registration", formData);
		} else {
			return instance.post("/registration", payload);
		}
	},
	login(payload: Login_Data_types) {
		return instance.post("/login", payload);
	},
};

export type Create_Person_type = {
	name: string;
	userName: string;
	profession: string;
	age: number | undefined;
	experience: string | undefined;
	price: number;
	isFree: boolean;
	rating: number;
	password: string;
	photo: File | undefined;
};

export type Login_Data_types = {
	userName: string;
	password: string;
};
