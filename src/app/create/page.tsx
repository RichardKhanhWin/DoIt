import { createToDoItem } from "@/lib/actions";

export default function CreateToDoPage() {
	return (
		<form action={createToDoItem} className="flex justify-center">
			<div className="flex-col justify-between">
				<div>
					<input name="title" defaultValue={""} className="dark:bg-slate-700 p-1"/>
					<input type="checkbox" name="done" defaultChecked={false} />
				</div>
				<div>
					<textarea name="description" defaultValue={""} className="dark:bg-slate-700 p-1" />
				</div>
				<div>
					<button type="submit">Create</button>
				</div>
			</div>
		</form>
	)
}