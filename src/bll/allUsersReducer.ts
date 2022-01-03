import { Dispatch } from "redux";
import { personApi, Person_Type } from "../dal/personApi";

export const enum Cases {
	GET_ALL = "person/GET_ALL_PERSON",
}

const initialState: Person_Type[] = [];

export const allUsersReducer = (
	state: Person_Type[] = initialState,
	action: AllUsersAction_type
): Person_Type[] => {
	switch (action.type) {
		case Cases.GET_ALL: {
			return [...state, ...action.data];
		}
		default:
			return state;
	}
};

// actions
const setAllUsers = (data: Person_Type[]) => {
	return { type: Cases.GET_ALL, data } as const;
};

// thunks
export const getAllUserFromBack = async (dispatch: Dispatch) => {
	try {
		const res = await personApi.getAllPerson();
		dispatch(setAllUsers(res.data));
	} catch (err: any) {
		console.log(err.message);
	}
};

// types
export type AllUsersAction_type = ReturnType<typeof setAllUsers>;
