import React, { useState } from "react";
import { Gist } from "./gists.control";

export interface GistListProps {
  useGists: (page?: number) => [Gist[] | null, string?];
}

export const GistList: React.FC<GistListProps> = props => {
  const [page, setPage] = useState(0);
  const [gists, error] = props.useGists(page);

  if (error !== undefined) {
    return <div>{error}</div>;
  }
  if (gists === null) {
    return <div>Loading gists page {page + 1}</div>;
  }

  return (
    <>
      <ul>
        {gists.map(gist => (
          <li>{gist.url}</li>
        ))}
      </ul>
      {page > 0 && <button onClick={() => setPage(page - 1)}>Prev</button>}
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};
