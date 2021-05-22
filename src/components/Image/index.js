import { IMAGE_BASE_PATH } from "../../constants";
import styles from "./image.module.css";

const Image = ({ path, size, title, frame = "list-item" }) => {
  const src = path
    ? `${IMAGE_BASE_PATH}/${size}${path}`
    : "https://via.placeholder.com/185";

  return (
    <div data-frame={frame} className={styles.root}>
      {<img src={src} alt={title} title={title} />}
    </div>
  );
};

export default Image;
