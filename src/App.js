import { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import SearchForm from "./components/Search/SearchForm";
import SearchResults from "./components/Search/SearchResults";
import SearchPage from "./components/Search/SearchPage";
import PersonDetail from "./components/Person/Detail";
import MovieDetail from "./components/Movie/Detail";
import TVDetail from "./components/TV/Detail";
import { SEARCH_MULTI } from "./constants";
import useFetch from "./hooks/useFetch";
import styles from "./app.module.css";

function App() {
  const { push, listen } = useHistory();
  const [searchType, setSearchType] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, runSearch] = useFetch("", true);
  const onClear = () => {
    setSearchType("");
  };
  const onSubmit = async (type, query) => {
    setSearchType(type);
    if (type === "submit") {
      push({ pathname: "/search", search: `?query=${query}` });
    } else {
      runSearch(`${SEARCH_MULTI}?query=${query}`);
    }
  };
  useEffect(() => {
    const unlisten = listen(() => {
      setSearchType("");
    });
    return () => {
      unlisten();
    };
  }, [listen]);

  return (
    <div className={styles.root}>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <SearchForm
        onSubmit={onSubmit}
        onClear={onClear}
        onFilter={setFilter}
        filter={filter}
      >
        {searchType === "suggest" && !!data && (
          <SearchResults results={data.results} filter={filter} />
        )}
      </SearchForm>
      <Switch>
        <Route path="/search">
          <SearchPage filter={filter} />
        </Route>
        <Route path="/movie/:id">
          <MovieDetail />
        </Route>
        <Route path="/person/:id">
          <PersonDetail />
        </Route>
        <Route path="/tv/:id">
          <TVDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
