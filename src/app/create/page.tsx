"use client"

import { createToDoItem } from "@/lib/actions";
import Checkbox from "@/components/Checkbox";
import { useReducer, FormEvent } from "react";

const initialState = {
	isLoading: false,
	error: null
};

function reducer(state: { isLoading: boolean, error: string | null}, action: { type: "onSubmit" | "error", errorMessage?: string }) {
	switch (action.type) {
		case "onSubmit":
			return {
				isLoading: true,
				error: null
			};
		case "error":
			return {
				isLoading: false,
				error: "An error occurred"
			};
		default:
			return state;
	}
}


export default function CreateToDoPage() {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		dispatch({ type: "onSubmit" });

		const formData = new FormData(e.currentTarget);
		createToDoItem(formData)
			.catch(err => {
				dispatch({ type: "error", errorMessage: err.message });
			});
	}

	return (
		<form onSubmit={onSubmit} className="flex items-center justify-center w-1/2 m-auto h-screen">
			<div className="flex grow items-center flex-col gap-y-[8px]">
				<div className="flex min-w-full justify-between gap-x-[4px]">
					<input name="title" defaultValue={""} className="dark:bg-slate-700 dark:text-white p-1 grow" required/>
					<Checkbox name="done" defaultChecked={false} className="h-8 w-8 bg-slate-200 border-black border-2 text-black" />
				</div>
				<div className="flex min-w-full">
					<textarea name="description" rows={10} className="dark:bg-slate-700 dark:text-white p-1 grow resize-none" />
				</div>
				<div>
					<button type="submit" className={`p-2 rounded-md dark:bg-indigo-900 dark:text-white ${state.isLoading && "opacity-50"}`} disabled={state.isLoading}>
						{state.isLoading ? "Creating..." : "Create"}
					</button>
				</div>
			</div>
		</form>
	)
}