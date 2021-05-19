import { useState, useEffect, useRef } from "react";

const SearchForm = ({ onSubmit }) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search?.trim());
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor="app-search">Search</label>
      <input
        ref={inputRef}
        id="app-search"
        name="q"
        type="search"
        value={search}
        onChange={onChange}
        placeholder="Search movies, shows, actors..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
