import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/",
});

export const personApi = {
	getAllPerson() {
		return instance.get("/person");
	},
	getPersonById(_id: string) {
		return instance.get(`/person/${_id}`);
	},
	createPerson(person: any) {
		return instance.post<any, any>("/person", person);
	},
    updatePerson(person: any) {
        return instance.put("/person", person)
    },
    removePerson(_id: string) {
        return instance.delete(`/person/${_id}`)
    }
};
