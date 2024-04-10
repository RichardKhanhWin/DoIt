export default function ToDoItem({title, description}: {title: string; description: string;}) {
	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			<input type="checkbox" name="complete"/>
		</>
	);
}