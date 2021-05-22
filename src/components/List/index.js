import styles from "./list.module.css";

const List = ({ children }) => <ul className={styles.root}>{children}</ul>;

export default List;
