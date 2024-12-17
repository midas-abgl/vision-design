import { createStore } from "zustand";
import { persist } from "zustand/middleware";
export { useShallow } from "zustand/react/shallow";

export interface AppState {
	client: Client;
	terms: LegalTerms;
}

export interface AppActions {
	setClient: (client: Client) => void;
	setTerms: (terms: LegalTerms) => void;
}

export type AppStore = AppState & AppActions;

const defaultState = {
	client: {
		id: "",
		name: "",
		email: "",
		phoneNumber: "",
	},
	terms: {
		id: "",
		text: "",
	},
};

export const createAppStore = (initialState: AppState = defaultState) => {
	return createStore<AppStore>()(
		persist(
			set => ({
				...initialState,
				setClient: client => set({ client }),
				setTerms: terms => set({ terms }),
			}),
			{ name: "@vd:store" },
		),
	);
};
