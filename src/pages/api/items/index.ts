import prisma from "@/lib/prisma";

export default async function handle(req, res) {
	// Get to-do items from database
	try {
		const toDoItems = await prisma.toDoItem.findMany();
		res.status(200).json(toDoItems)
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: "An error occured."});
	}
}