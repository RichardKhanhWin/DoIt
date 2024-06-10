'use client';

import { useState } from 'react';
import { toggleDone, deleteToDoItem } from '@/lib/actions';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ToDoCard({ item_id, title, description, done }: { item_id: number, title: string, description: string | null, done: boolean }) {
	const toggle = toggleDone.bind(null, item_id);

	const deleteItem = deleteToDoItem.bind(null, item_id);

	const [complete, setComplete] = useState(done);

	return (
		<div className="bg-slate-200 text-black border-2 border-slate-800 p-3 w-96 my-4">
			<div className="flex justify-between">
				<h2 className="font-bold">{title}</h2>
				<div className="flex justify-between items-center gap-x-2">
					<form action={toggle}>
						<button onClick={() => { setComplete(!complete) }} className="bg-white w-4 h-4 border-2 border-slate-400 block">
							{ complete && <CheckIcon /> }
						</button>
					</form>
					<Link href={`/edit/${item_id}`} className="bg-white w-4 h-4 border-2 border-slate-400 block">
						<PencilIcon />
					</Link>
					<form action={deleteItem}>
						<button className="bg-white w-4 h-4 border-2 border-slate-400 block">
							<TrashIcon />
						</button>
					</form>
				</div>
			</div>
			<p>{description}</p>
		</div>
	);
}