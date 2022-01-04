import { Dispatch } from "redux";
import { personApi, Person_Type } from "../dal/personApi";
import { setLoadingMode } from "./mainAppReducer";

const initState: CosenUserState_Type = {
	chosenUser: undefined,
};

export const currentUserReducer = (
	state: CosenUserState_Type = initState,
	action: any
): CosenUserState_Type => {
	switch (action.type) {
		case CurrentUserCases.SET_FOUND_USER: {
			return { ...state, chosenUser: action.chosenUser };
		}
		default:
			return state;
	}
};

// actions
export const setFoundUser = (chosenUser: Person_Type | undefined) => {
	return { type: CurrentUserCases.SET_FOUND_USER, chosenUser } as const;
};

// thunks
export const getChosenUser = (userId: string) => async (dispatch: Dispatch) => {
	dispatch(setLoadingMode("loading"));
	try {
		const res = await personApi.getPersonById(userId);
		dispatch(setFoundUser(res.data));
		dispatch(setLoadingMode("idle"));
	} catch (err: any) {
		console.log(err.message);
		dispatch(setLoadingMode("idle"));
	}
};

// types
export enum CurrentUserCases {
	SET_FOUND_USER = "chosenUser/SET_FOUND_USER",
}

export type CosenUserState_Type = {
	chosenUser: Person_Type | undefined;
};
