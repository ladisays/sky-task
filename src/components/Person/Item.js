import Image from "../Image";
import ListItem from "../List/Item";

const PersonItem = ({ id, name, profile_path, known_for_department }) => {
  return (
    <ListItem to={`/person/${id}`}>
      <Image id={id} path={profile_path} size="w185" title={name} />
      <ListItem.Detail>
        <ListItem.Title><strong>{name}</strong></ListItem.Title>
        <p>{known_for_department}</p>
      </ListItem.Detail>
    </ListItem>
  );
};

export default PersonItem;
