export default function ToDoCard({ item_id, title, description, done }: { item_id: number, title: string, description: string, done: boolean }) {
	return (
		<div className="bg-slate-200 text-black border-2 border-slate-800 p-3 w-96 my-4">
			<div className="flex justify-between">
				<h2 className="font-bold">{title}</h2>
				<div className="flex justify-between gap-x-2">
					<input type="checkbox" name="complete" defaultChecked={done}
						onChange={(e) => {
							fetch("api/items", {
								method: "PUT",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									id: item_id,
									title,
									description,
									done: e.target.checked
								})
							})
						}} />

						<button onClick={(e) => fetch("api/items", {
							method: "DELETE",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								id: item_id
							})
						})}>
							X
						</button>
				</div>
			</div>
			<p>{description}</p>
		</div>
	);
}