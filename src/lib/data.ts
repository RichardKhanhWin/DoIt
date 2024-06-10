import prisma from '@/lib/prisma';

export async function fetchToDoItems() {
	const toDoItems = await prisma.toDoItem.findMany();

	return toDoItems;
}

export async function fetchToDoItemById(id: number | string) {
	const toDoItem = await prisma.toDoItem.findFirst({ where: { id: typeof(id) == "number" ? id : Number(id) } });

	return toDoItem;
}