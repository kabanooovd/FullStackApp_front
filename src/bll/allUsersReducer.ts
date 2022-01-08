import { Dispatch } from "redux";
import { Create_Person_type, personApi, Person_Type } from "../dal/personApi";
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
			return [...action.data];
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
	dispatch(setLoadingMode("loading"));
	try {
		const res = await personApi.getAllPerson();
		dispatch(setAllUsers(res.data));
		dispatch(setLoadingMode("idle"));
	} catch (err: any) {
		console.log(err.message);
		dispatch(setLoadingMode("idle"));
	}
};

export const updateUser =
	(currentUser: Person_Type) => async (dispatch: Dispatch) => {
		dispatch(setLoadingMode("loading"));
		try {
			await personApi.updatePerson(currentUser);
			alert("Updated");
			dispatch(setLoadingMode("idle"));
		} catch (err: any) {
			console.log(err.message);
			dispatch(setLoadingMode("idle"));
		}
	};

export const createUser =
	(newPersonData: Create_Person_type): ThunkType => async (dispatch) => {
		dispatch(setLoadingMode("loading"));
		try {
			await personApi.createPerson(newPersonData);
			dispatch(getAllUserFromBack);
			dispatch(setLoadingMode("idle"));
		} catch (err: any) {
			console.log(err.message);
			dispatch(setLoadingMode("idle"));
		}
	};

// types
export type AllUsersAction_type = ReturnType<typeof setAllUsers>;
