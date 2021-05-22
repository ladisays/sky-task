import { Link } from "react-router-dom";

import styles from "./item.module.css";

const Detail = ({ children }) => (
  <div className={styles.details}>{children}</div>
);
const Title = ({ children }) => <div className={styles.title}>{children}</div>;

const ListItem = ({ to, children }) => {
  return (
    <li className={styles.root}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

ListItem.Detail = Detail;
ListItem.Title = Title;

export default ListItem;
