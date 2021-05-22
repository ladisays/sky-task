import { useCallback, useEffect, useState } from "react";

const useFetch = (url, lazy = false) => {
  const [data, setData] = useState(null);
  const run = useCallback(
    async (overrideURL = url) => {
      try {
        const res = await fetch(overrideURL, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DB_ACCESS_TOKEN}`,
          },
        });
        const json = await res.json();
        setData(json);
      } catch {}
    },
    [url]
  );

  useEffect(() => {
    if (!lazy) {
      run();
    }
  }, [lazy, run]);

  return [data, run];
};

export default useFetch;
