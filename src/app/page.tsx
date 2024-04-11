'use client';

import ToDoItem from "@/components/ToDoItem";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/items", (url) => fetch(url).then(response => response.json()));
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      { isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured.</p>
      ) : data ? (
          <div className="flex-col">
            { data.map(element => {
                return (
                  <ToDoItem
                    key={element.id}
                    title={element.title}
                    description={element.description}
                    done={element.done} />
                )
              })
            }
          </div>
        ) : (
          <p>Nothing in here.</p>
        )
      }
    </main>
  );
}
