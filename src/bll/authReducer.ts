import { Dispatch } from "redux";
import { authAPI, Create_Person_type, Login_Data_types } from "../dal/authApi";
import { RoleTypes } from "../utils/commonTypes";
import { jwtDecoder } from "../utils/jwtDecoder";
import { LocalMemoManager } from "../utils/localMemoManager";

export enum authCases {
	SET_LOGGED_USER_DATA = "AUTH/SET_LOGGED_USER_DATA",
}

const initState: AuthStateTypes = {
	userName: "",
	role: undefined,
};

export const authReducer = (
	state: AuthStateTypes = initState,
	action: AuthActionsTypes
): AuthStateTypes => {
	switch (action.type) {
		case authCases.SET_LOGGED_USER_DATA: {
			return { ...state, ...action.payload };
		}
		default:
			return state;
	}
};

// actions

export const setLoggedUserData = (payload: AuthStateTypes) => {
	return { type: authCases.SET_LOGGED_USER_DATA, payload } as const;
};

// thunks

export const regsterNewUser =
	(payload: Create_Person_type) => async (dispatch: Dispatch) => {
		try {
			const resp = await authAPI.registration(payload);
			alert(resp.data);
		} catch (err) {
			console.log(err);
		}
	};

export const login =
	(payload: Login_Data_types) => async (dispatch: Dispatch) => {
		try {
			const resp = await authAPI.login(payload);
			const { userName, role } = jwtDecoder(resp.data.token);
			dispatch(setLoggedUserData({ userName, role }));
			const lmm = new LocalMemoManager();
			lmm.setToken(resp.data.token);
		} catch (err) {
			console.log(err);
		}
	};

// types
export type AuthStateTypes = {
	userName: string;
	role: RoleTypes | undefined;
};

export type AuthActionsTypes = ReturnType<typeof setLoggedUserData>;
