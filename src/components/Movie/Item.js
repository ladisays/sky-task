import Image from "../Image";
import ListItem from "../List/Item";

const MovieItem = ({ id, title, overview, poster_path, release_date }) => {
  return (
    <ListItem to={`/movie/${id}`}>
      <Image id={id} path={poster_path} size="w185" title={title} />
      <ListItem.Detail>
        <ListItem.Title>
          <strong>{title}</strong>
          <span>{release_date}</span>
        </ListItem.Title>
        <p>{overview}</p>
      </ListItem.Detail>
    </ListItem>
  );
};

export default MovieItem;
