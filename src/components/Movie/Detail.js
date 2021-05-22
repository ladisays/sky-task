import { useParams } from "react-router-dom";

import Image from "../Image";
import { MOVIE_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import PersonItem from "../Person/Item";
import List from "../List";
import formatTime from "../../utils/time-formatter";
import styles from "./detail.module.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [data] = useFetch(`${MOVIE_URL}/${id}?append_to_response=credits`);

  return (
    <div className={styles.root}>
      <section className={styles.infoWrapper}>
        <Image
          path={data?.poster_path}
          size="w342"
          title={data?.title}
          frame="detail"
        />
        <div className={styles.info}>
          <h1>{data?.title}</h1>
          <p>
            <span>{data?.release_date}</span>
            <span className={styles.runtime}>
              {formatTime(data?.runtime || 0)}
            </span>
          </p>
          {data?.tagline && <p>{data.tagline}</p>}
          <div>
            <strong>Overview</strong>
            <p>{data?.overview}</p>
          </div>
        </div>
      </section>
      <section className={styles.credits}>
        <div>
          <p>
            <strong>Cast</strong>
          </p>
          <List>
            {data?.credits.cast.map((item, idx) => (
              <PersonItem key={`cast-${item.id}-${idx}`} {...item} />
            ))}
          </List>
        </div>
        {/* <div>
          <h4>Crew</h4>
          <List>
            {data?.credits.crew.map((item, idx) => (
              <PersonItem key={`crew-${item.id}-${idx}`} {...item} />
            ))}
          </List>
        </div> */}
      </section>
    </div>
  );
};

export default MovieDetail;
