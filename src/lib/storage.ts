import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export interface AppState {
	client: Client;
}

export interface AppActions {
	setClient: (client: Client) => void;
}

export type AppStore = AppState & AppActions;

const defaultState = { client: { email: "", id: "", name: "", phoneNumber: "" } };

export const createAppStore = (initialState: AppState = defaultState) => {
	return createStore<AppStore>()(
		persist(
			set => ({
				...initialState,
				setClient: client => set({ client }),
			}),
			{ name: "@vd:store" },
		),
	);
};
