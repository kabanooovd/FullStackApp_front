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
	createPerson(person: Person_Type) {
		return instance.post<Person_Type>("/person", person);
	},
	updatePerson(person: Person_Type) {
		return instance.put<Person_Type>("/person", person);
	},
	removePerson(_id: string) {
		return instance.delete<Person_Type>(`/person/${_id}`);
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
