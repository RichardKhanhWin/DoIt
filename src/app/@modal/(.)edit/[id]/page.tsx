import Modal from '@/components/Modal';
import { updateToDoItem } from "@/lib/actions";
import { fetchToDoItemById } from "@/lib/data";
import Checkbox from "@/components/Checkbox";

export default async function EditToDoModal({
	params
}: {
	params: { id: string }
}) {
	const item = await fetchToDoItemById(params.id);
	const editItem = updateToDoItem.bind(null, params.id);

	return (
		<Modal>
			<form action={editItem} className="flex grow items-center">
				<div className="flex items-center flex-col min-w-full gap-y-[8px]">
					<div className="flex min-w-full justify-between gap-x-[4px]">
						<input name="title" defaultValue={item?.title} className="text-box h-8 grow" placeholder="Title (required)" required maxLength={50} />
						<Checkbox name="done" defaultChecked={item?.done} className="checkbox h-8 w-8 border-2" />
					</div>
					<div className="flex min-w-full">
						<textarea name="description" rows={10} defaultValue={item?.description || ""} className="text-box grow resize-none" placeholder="Description" />
					</div>
					<div>
						<button type="submit" className="button p-2 rounded-md">Update</button>
					</div>
				</div>
			</form>
		</Modal>
	);
}