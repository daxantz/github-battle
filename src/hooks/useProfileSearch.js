import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

export default function useProfileSearch(users) {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function fetchUser(query) {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.github.com/users/${query}`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const data = await res.json();
        if (data.status === "404") {
          throw new Error("User Not Found");
        }
        if (users.some((user) => user.id === data.id)) {
          setCurrentUser({});
          //clear error after 5 seconds
          setTimeout(() => {
            setError(null);
            setQuery("");
          }, 5000);
          throw new Error("Cannot add duplicates");
        }
        console.log(data);

        setCurrentUser({ ...data });
        setError(null);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    const debouncedFetch = debounce(fetchUser, 1500);
    if (query) {
      debouncedFetch(query);
    }
    return () => {
      clearTimeout(debouncedFetch);
    };
  }, [query, users]);

  return {
    currentUser,
    isloading,
    error,
    query,
    setQuery,
    setError,
    setIsLoading,
    setCurrentUser,
  };
}
