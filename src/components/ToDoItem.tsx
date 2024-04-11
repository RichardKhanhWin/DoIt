export default function ToDoItem({ title, description, done }: { title: string, description: string, done: boolean }) {
	return (
		<div className="bg-slate-200 text-black p-3 w-96 my-4">
			<div className="flex justify-between">
				<h2>{title}</h2>
				<input type="checkbox" name="complete" defaultChecked={done}/>
			</div>
			<p>{description}</p>
		</div>
	);
}