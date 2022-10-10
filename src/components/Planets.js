import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Planet from "./Planet";
// import { useQuery } from 'react-query'

const fetchPlanets = async (page) => {
  const result = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return result.json();
};
const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, isPreviousData, status } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
      // staleTime: 0,
      // cacheTime: 10,
      // onSuccess: () => console.log("data fetched"),
    }
  );
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(1, old - 1))}
            disabled={page === 1}
          >
            Previous page
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
            Next page
          </button>

          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
