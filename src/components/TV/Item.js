import Image from "../Image";
import ListItem from "../List/Item";

const TVItem = ({ id, name, overview, poster_path, first_air_date }) => {
  return (
    <ListItem to={`/tv/${id}`}>
      <Image id={id} path={poster_path} size="w185" title={name} />
      <ListItem.Detail>
        <ListItem.Title>
          <strong>{name}</strong>
          <span>{first_air_date}</span>
        </ListItem.Title>
        <p>{overview}</p>
      </ListItem.Detail>
    </ListItem>
  );
};

export default TVItem;
