import MediaItem from "../Media/Item";
import List from "../List";

const SearchResults = ({ results = [], filter = "all" }) => {
  const list =
    filter !== "all"
      ? results.filter((item) => item.media_type === filter)
      : results;

  return !!list.length ? (
    <List>
      {list.map((item) => (
        <MediaItem key={item.id} detailed {...item} />
      ))}
    </List>
  ) : (
    <div role="alert">No results to display</div>
  );
};

export default SearchResults;
