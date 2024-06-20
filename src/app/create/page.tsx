import { createToDoItem } from "@/lib/actions";
import Checkbox from "@/components/Checkbox";

export default function CreateToDoPage() {
	return (
		<form action={createToDoItem} className="flex items-center justify-center w-1/2 m-auto h-screen">
			<div className="flex grow items-center flex-col gap-y-[8px]">
				<div className="flex min-w-full justify-between gap-x-[4px]">
					<input name="title" defaultValue={""} className="dark:bg-slate-700 dark:text-white p-1 grow"/>
					<Checkbox name="done" defaultChecked={false} className="h-8 w-8 bg-slate-200 border-black border-2 text-black" />
				</div>
				<div className="flex min-w-full">
					<textarea name="description" rows={10} className="dark:bg-slate-700 dark:text-white p-1 grow resize-none" />
				</div>
				<div>
					<button type="submit" className="p-2 rounded-md dark:bg-indigo-900 dark:text-white">Create</button>
				</div>
			</div>
		</form>
	)
}