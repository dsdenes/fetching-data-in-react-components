import { useState, useEffect } from "react";

export interface Gist {
  url: string;
}

async function fetchGists(page: number = 0): Promise<Gist[]> {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/gists/public?per_page=5&page=${page}`)
      .then(response => resolve(response.json()))
      .catch(err => reject(err))
      .finally(() => (fetching = null));
  });
}

export const useGists = (page: number = 0): [Gist[] | null, string?] => {
  const [gists, setGists] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    setGists(null);
    let mounted = true;
    fetchGists(page)
      .then(gists => {
        setTimeout(() => {
          if (mounted) {
            setGists(gists);
          }
        }, 500);
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
        }
      });
    return () => (mounted = false);
  }, [page]);

  return [gists, error];
};
