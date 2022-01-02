import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { personApi } from "./dal/personApi";

function App() {
	React.useEffect(() => {
		// personApi.getAllPerson().then((res) => {
		// 	console.log(res.data);
		// });
		// personApi.getPersonById("61d22370b8407b4cf37df41a").then((res) => {
		// 	console.log(res.data);
		// });
		// const person = {
		// 	_id: "61d22f13771925b732af805f",
		// 	name: "Kaha - loh",
		// 	profession: "wor",
		// 	age: 18,
		// 	experience: "48",
		// 	price: 12,
		// 	isFree: true,
		// 	rating: 9,
		// };
		// personApi
		// 	.createPerson(person)
		// 	.then(() => {
		// 		console.log("good...");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.message);
		// 	});
		// personApi
		// 	.updatePerson(person)
		// 	.then(() => {
		// 		console.log("good...");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err.message);
		// 	});
		personApi
			.removePerson("61d22f13771925b732af805f")
			.then(() => {
				console.log("Done... ");
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<div>
			<h1>Init project</h1>
		</div>
	);
}

export default App;
