import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/",
});

export const personApi = {
	getAllPerson() {
		return instance.get<Person_Type[]>("/person");
	},
	getPersonById(_id: string) {
		return instance.get<Person_Type>(`/person/${_id}`);
	},
	createPerson(person: Create_Person_type) {
		if (person.photo) {
			const formData = new FormData();
			formData.append("name", person.name);
			formData.append("profession", person.profession);
			person.age && formData.append("age", String(person.age));
			person.experience && formData.append("experience", person.experience);
			formData.append("price", String(person.price));
			formData.append("isFree", String(person.isFree));
			formData.append("rating", String(person.rating));
			formData.append("photo", person.photo);
			return instance.post<Person_Type>("/person", formData);
		} else {
			return instance.post<Person_Type>("/person", person);
		}
	},
	updatePerson(person: Person_Type) {
		return instance.put<Person_Type>("/person", person);
	},
	removePerson(_id: string) {
		return instance.delete<Person_Type>(`/person/${_id}`);
	},
	mkImg(file: File) {
		const formData = new FormData();
		formData.append("image", file);
		return instance.post("/img", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};

export type Person_Type = {
	_id: string;
	name: string;
	profession: string;
	age: number | undefined;
	experience: string | undefined;
	price: number;
	isFree: boolean;
	rating: number;
	photo: string | undefined;
};

export type Create_Person_type = {
	name: string;
	profession: string;
	age: number | undefined;
	experience: string | undefined;
	price: number;
	isFree: boolean;
	rating: number;
	photo: File | undefined;
};
