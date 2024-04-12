import prisma from "@/lib/prisma";

export default async function handle(req, res) {

	if (req.method === "GET") {
		// Get to-do items from database
		try {
			const toDoItems = await prisma.toDoItem.findMany();
			res.status(200).json(toDoItems)
		} catch (err) {
			console.log(err);
			res.status(400).json({ error: "An error occured."});
		}
	} else if (req.method === "POST") {
		const { title, description } = req.body;
		const result = await prisma.toDoItem.create({
			data: {
				title,
				description
			}
		});

		res.json(result);
	}
}