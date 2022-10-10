import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Person from "./Person";

const fetchPeople = async (page) => {
  const result = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return result.json();
};
const People = () => {
  const [page, setPage] = useState(1);
  const { data, isPreviousData, status } = useQuery(["people", page], () =>
    fetchPeople(page)
  );
  console.log(data);

  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(1, old - 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next Page
          </button>
          <div>
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
