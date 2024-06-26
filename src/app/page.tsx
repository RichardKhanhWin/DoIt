import ToDoCard from "@/components/ToDoCard";
import { ToDoItem } from "@/lib/definitions";
import Link from "next/link";
import { fetchToDoItems } from "@/lib/data";

export default async function Home() {
  const data = await fetchToDoItems();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="flex-col">
        { data.map((element: ToDoItem, index: number) => {
            return (
              <ToDoCard
                key={index}
                item_id={element.id}
                title={element.title}
                description={element.description ? element.description : ''}
                done={element.done} />
            )
          })
        }
      </div>

      <Link href="/create">Create</Link>
    </main>
  );
}
