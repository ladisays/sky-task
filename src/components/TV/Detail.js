import { useParams } from "react-router-dom";

import Image from "../Image";
import { TV_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import PersonItem from "../Person/Item";
import List from "../List";
import formatTime from "../../utils/time-formatter";
import styles from "./detail.module.css";

const TVDetail = () => {
  const { id } = useParams();
  const [data] = useFetch(`${TV_URL}/${id}?append_to_response=credits`);

  return (
    <div className={styles.root}>
      <section className={styles.infoWrapper}>
        <Image
          path={data?.poster_path}
          size="w342"
          title={data?.name}
          frame="detail"
        />
        <div className={styles.info}>
          <h1>{data?.name}</h1>
          <p>
            <span>{data?.first_air_date}</span>
            {data?.episode_run_time.map((runtime, idx) => (
              <span key={idx} className={styles.runtime}>
                {formatTime(runtime)}
              </span>
            ))}
          </p>
          {data?.tagline && <p>{data?.tagline}</p>}
          <div>
            <strong>Overview</strong>
            <p>{data?.overview}</p>
          </div>
        </div>
      </section>
      <section>
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

export default TVDetail;
