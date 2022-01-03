const initState: MainAppState_Type = {
	loadingMode: "idle",
};

export const mainAppReducer = (
	state: MainAppState_Type = initState,
	action: MainAppAction_Type
): MainAppState_Type => {
	switch (action.type) {
		case MainAppTypes.LOADIN_MODE: {
			return { ...state, loadingMode: action.loadingMode };
		}
		default:
			return state;
	}
};

// actions
export const setLoadingMode = (loadingMode: LoadingMode_Type) => {
	return { type: MainAppTypes.LOADIN_MODE, loadingMode } as const;
};

// types
export type MainAppAction_Type = ReturnType<typeof setLoadingMode>;

export enum MainAppTypes {
	LOADIN_MODE = "app/CURRENT_LOADIN_MODE",
}

export type LoadingMode_Type = "idle" | "loading" | "succeded" | "error";

export type MainAppState_Type = {
	loadingMode: LoadingMode_Type;
};
