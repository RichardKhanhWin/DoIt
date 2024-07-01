"use client"

import { createToDoItem } from "@/lib/actions";
import Checkbox from "@/components/Checkbox";
import { useReducer, FormEvent } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
	isLoading: false,
	title: "",
	validTitle: true,
	error: null
};

function reducer(state: { isLoading: boolean, title: string, validTitle: boolean, error: string | null}, action: { type: "onSubmit" | "onTitleChange" | "error" , title?: string, errorMessage?: string }) {
	switch (action.type) {
		case "onSubmit":
			return {
				...state,
				isLoading: true,
				error: null
			};
		case "error":
			return {
				...state,
				isLoading: false,
				error: action.errorMessage || "An error occurred"
			};
		case "onTitleChange":
			return {
				...state,
				title: action.title!.trim(),
				validTitle: action.title!.trim().length > 0 && action.title!.trim().length <= 50
			}
		default:
			return state;
	}
}

export default function CreateToDoPage() {
	const [state, dispatch] = useReducer(reducer, initialState);
	
	if (state.error) {
		toast(state.error);
	}

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!state.validTitle) {
			toast("Title must be between 1 and 50 characters");
			return;
		}

		dispatch({ type: "onSubmit" });
		
		const formData = new FormData(e.currentTarget);
		await createToDoItem(formData)
		.catch(err => dispatch({ type: "error", errorMessage: err.message }));
	}

	return (
		<>
			<form onSubmit={onSubmit} className="flex items-center justify-center w-1/2 m-auto h-screen">
				<div className="flex grow items-center flex-col gap-y-[8px]">
					<div className="flex min-w-full justify-between gap-x-[4px]">
						<input name="title" defaultValue={""} className="dark:bg-slate-700 dark:text-white p-1 grow" placeholder="Title (required)" onChange={e => dispatch({ type: "onTitleChange", title: e.target.value })} required maxLength={50}/>
						<Checkbox name="done" defaultChecked={false} className="h-8 w-8 bg-slate-200 border-black border-2 text-black" />
					</div>
					<div className="flex min-w-full">
						<textarea name="description" rows={10} className="dark:bg-slate-700 dark:text-white p-1 grow resize-none" placeholder="Description" />
					</div>
					<div>
						<button type="submit" className={`p-2 rounded-md dark:bg-indigo-900 dark:text-white ${state.isLoading && "opacity-50"}`} disabled={state.isLoading}>
							{state.isLoading ? "Creating..." : "Create"}
						</button>
					</div>
				</div>
			</form>
			<ToastContainer
				position="top-right"
				autoClose={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
		</>
	)
}