'use server';

import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ToDoObject = z.object({
	id: z.string().uuid(),
	title: z.string().max(50),
	description: z.string().nullable(),
	done: z.coerce.boolean()
});

const CreateForm = ToDoObject.omit({ id: true });
export async function createToDoItem(formData: FormData) {
	const createdData: z.SafeParseReturnType<{ title: string, description: string | null, done: boolean }, { title: string, description: string | null, done: boolean }> = CreateForm.safeParse({
		title: formData.get('title')!.toString().trim(),
		description: formData.get('description'),
		done: formData.get('done')
	});

	if (!createdData.success) {
		throw new Error(createdData.error.flatten().fieldErrors.title?.join());
	}
	
	await prisma.toDoItem.create({ data: createdData.data });

	revalidatePath('/');
	
	redirect('/');
}

const UpdateForm = ToDoObject.omit({ id: true });
export async function updateToDoItem(id: string, formData: FormData) {
	const updatedData: z.SafeParseReturnType<{ title: string, description: string | null, done: boolean }, { title: string, description: string | null, done: boolean }> = UpdateForm.safeParse({
		title: formData.get('title')!.toString().trim(),
		description: formData.get('description'),
		done: formData.get('done')
	});

	if (!updatedData.success) {
		throw new Error(updatedData.error.flatten().fieldErrors.title?.join());
	}

	await prisma.toDoItem.update({
		where: {
			id
		},
		data: {
			...updatedData.data
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