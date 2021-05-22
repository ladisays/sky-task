import { useLocation } from "react-router-dom";

import SearchResults from "./SearchResults";
import { SEARCH_MULTI } from "../../constants";
import useFetch from "../../hooks/useFetch";

const SearchPage = ({ filter }) => {
  const search = new URLSearchParams(useLocation().search);
  const query = search.get("query");
  const url = `${SEARCH_MULTI}?query=${query}`;
  const [data] = useFetch(url, !query);

  return !!data && <SearchResults results={data.results} filter={filter} />;
};

export default SearchPage;
