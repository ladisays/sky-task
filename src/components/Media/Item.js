import PersonItem from "../Person/Item";
import MovieItem from "../Movie/Item";
import TVItem from "../TV/Item";

const componentMap = {
  person: PersonItem,
  tv: TVItem,
  movie: MovieItem,
};

const Other = () => <li>Other media</li>;

const MediaItem = (props) => {
  const Component = componentMap[props.media_type] || Other;

  return <Component {...props} />;
};

export default MediaItem;
