import { useState, useEffect, useRef } from "react";

import styles from "./search-form.module.css";
const options = [
  { id: "all", label: "All" },
  { id: "person", label: "Actors" },
  { id: "movie", label: "Movie" },
  { id: "tv", label: "TV" },
];

const SearchForm = ({ onSubmit, onClear, onFilter, filter, children }) => {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit("submit", search?.trim());
  };
  const onChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length >= 5) {
      onSubmit("suggest", value?.trim());
    } else {
      onClear();
    }
  };
  const handleSelect = (e) => {
    onFilter(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className={styles.root} role="search" onSubmit={handleSubmit}>
      <div className={styles.control}>
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
        {children && <div className={styles.suggestions}>{children}</div>}
      </div>
      <button type="submit">Search</button>
      <select value={filter} onChange={handleSelect}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchForm;
