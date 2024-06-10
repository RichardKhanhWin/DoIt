import Modal from '@/components/Modal';
import { updateToDoItem } from "@/lib/actions";
import { fetchToDoItemById } from "@/lib/data";

export default async function EditToDoModal({
	params
}: {
	params: { id: number }
}) {
	const item = await fetchToDoItemById(params.id);
	const editItem = updateToDoItem.bind(null, params.id);

	return (
		<Modal>
			<form action={editItem} className="flex justify-center">
				<div className="flex-col justify-between">
					<div>
						<input name="title" defaultValue={item?.title} className="dark:bg-slate-700 p-1"/>
						<input type="checkbox" name="done" defaultChecked={item?.done} />
					</div>
					<div>
						<textarea name="description" defaultValue={item?.description || ""} className="dark:bg-slate-700 p-1" />
					</div>
					<div>
						<button type="submit">Update</button>
					</div>
				</div>
			</form>
		</Modal>
	);
}