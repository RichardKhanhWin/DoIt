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
			<form action={editItem} className="flex grow items-center">
				<div className="flex items-center flex-col min-w-full gap-y-[8px]">
					<div className="flex min-w-full justify-between gap-x-[4px]">
						<input name="title" defaultValue={item?.title} className="dark:bg-slate-700 dark:text-white p-1 grow"/>
						<input type="checkbox" name="done" defaultChecked={item?.done} />
					</div>
					<div className="flex min-w-full">
						<textarea name="description" rows={10} defaultValue={item?.description || ""} className="dark:bg-slate-700 dark:text-white p-1 grow resize-none" />
					</div>
					<div>
						<button type="submit" className="p-2 rounded-md dark:bg-indigo-900 dark:text-white">Update</button>
					</div>
				</div>
			</form>
		</Modal>
	);
}