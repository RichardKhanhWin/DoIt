'use client';

import ToDoCard from "@/components/ToDoCard";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/items", (url) => fetch(url).then(response => response.json()));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      { isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured.</p>
      ) : data ? (
          <div className="flex-col">
            { data.map(element => {
                return (
                  <ToDoCard
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

      <Link href="/create">Create</Link>
    </main>
  );
}
