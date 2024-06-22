'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ToDoObject = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	done: z.coerce.boolean()
});

const CreateForm = ToDoObject.omit({ id: true });
export async function createToDoItem(formData: FormData) {
	const createdData: { title: string, description: string | null, done: boolean } = CreateForm.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		done: formData.get('done')
	});

	await prisma.toDoItem.create({ data: createdData });

	revalidatePath('/');
	
	redirect('/');
}

const UpdateForm = ToDoObject.omit({ id: true });
export async function updateToDoItem(id: string, formData: FormData) {
	const updatedData: { title: string, description: string | null, done: boolean } = UpdateForm.parse({
		title: formData.get('title'),
		description: formData.get('description'),
		done: formData.get('done')
	});

	await prisma.toDoItem.update({
		where: {
			id
		},
		data: {
			...updatedData
		}
	});

	revalidatePath('/');

	redirect('/');
}

export async function toggleDone(id: string, done: boolean) {
	const itemToUpdate = await prisma.toDoItem.findUnique({
		where: {
			id
		}
	});

	if (!itemToUpdate) {
		throw Error("Item not found.");
	}

	itemToUpdate.done = done;

	await prisma.toDoItem.update({
		where: {
			id
		},
		data: {
			...itemToUpdate
		}
	});
}

export async function deleteToDoItem(id: string) {
	await prisma.toDoItem.delete({
		where: {
			id
		}
	});

	revalidatePath('/');
}