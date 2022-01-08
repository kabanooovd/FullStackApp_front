import { Dispatch } from "redux";
import { personApi, Person_Type } from "../dal/personApi";
import { getAllUserFromBack } from "./allUsersReducer";
import { setLoadingMode } from "./mainAppReducer";
import { ThunkAction } from "redux-thunk";
import { Action, AnyAction } from "redux";
import { AppRootStateType } from "./store";

export type ThunkType<TAction extends Action = AnyAction> = ThunkAction<
	void,
	AppRootStateType,
	unknown,
	TAction
>;

const initState: CurrentUserState_Type = {
	chosenUser: undefined,
};

export const currentUserReducer = (
	state: CurrentUserState_Type = initState,
	action: CurrentUretAction_type
): CurrentUserState_Type => {
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

export const removeUser =
	(userId: string): ThunkType =>
	async (dispatch) => {
		dispatch(setLoadingMode("loading"));
		try {
			const res = await personApi.removePerson(userId);
			dispatch(getAllUserFromBack);
			dispatch(setLoadingMode("idle"));
		} catch (err: any) {
			alert(err.message);
			dispatch(setLoadingMode("idle"));
		}
	};

// types
export enum CurrentUserCases {
	SET_FOUND_USER = "chosenUser/SET_FOUND_USER",
}

export type CurrentUretAction_type = ReturnType<typeof setFoundUser>;

export type CurrentUserState_Type = {
	chosenUser: Person_Type | undefined;
};
