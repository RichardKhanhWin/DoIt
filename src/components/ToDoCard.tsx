'use client';

import { useState } from 'react';
import { toggleDone, deleteToDoItem } from '@/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Checkbox from './Checkbox';

export default function ToDoCard({ item_id, title, description, done }: { item_id: number, title: string, description: string | null, done: boolean }) {
	const toggle = toggleDone.bind(null, item_id);
	const deleteItem = deleteToDoItem.bind(null, item_id);
	
	const [complete, setComplete] = useState(done);

	function handleClick() {
		toggle(!complete);
		setComplete(!complete);
	}

	return (
		<div className="bg-slate-200 text-black border-2 border-slate-800 p-3 w-96 my-4">
			<div className="flex justify-between">
				<h2 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{title}</h2>
				<div className="flex justify-between items-center gap-x-2">
					<Checkbox onClick={handleClick} defaultChecked={complete} className="bg-white w-4 h-4 border-2 border-slate-400 block" />
					<Link href={`/edit/${item_id}`} className="bg-white w-4 h-4 border-2 border-slate-400 block">
						<PencilIcon />
					</Link>
					<button className="bg-white w-4 h-4 border-2 border-slate-400 block" onClick={() => deleteItem()}>
						<TrashIcon />
					</button>
				</div>
			</div>
			<p className="h-[72px] line-clamp-3 text-ellipsis">{description}</p>
		</div>
	);
}