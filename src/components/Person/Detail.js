import { useParams } from "react-router-dom";

import Image from "../Image";
import { PERSON_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import MediaItem from "../Media/Item";
import List from "../List";
import styles from "./detail.module.css";

const PersonDetail = () => {
  const { id } = useParams();
  const [data] = useFetch(
    `${PERSON_URL}/${id}?append_to_response=combined_credits`
  );

  return (
    <div className={styles.root}>
      <section className={styles.profile}>
        <Image
          path={data?.profile_path}
          size="w342"
          title={data?.name}
          frame="detail"
        />
        <h1>{data?.name}</h1>
        <section>
          <p>
            <strong>Known For</strong>
            <span>{data?.known_for_department}</span>
          </p>
          <p>
            <strong>Birthday</strong>
            <span>{data?.birthday}</span>
          </p>
          <p>
            <strong>Place of Birth</strong>
            <span>{data?.place_of_birth}</span>
          </p>
          {data?.deathday && (
            <p>
              <strong>Deathday</strong>
              <span>{data?.deathday}</span>
            </p>
          )}
          {!!data?.also_known_as.length && (
            <div className={styles.aka}>
              <strong>Also Known As</strong>
              <List>
                {data?.also_known_as.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </List>
            </div>
          )}
        </section>
      </section>
      <section className={styles.info}>
        <h1>{data?.name}</h1>
        <div>
          <strong>Biography</strong>
          <p>{data?.biography}</p>
        </div>
        <section>
          <div>
            <p>
              <strong>Cast</strong>
            </p>
            <List>
              {data?.combined_credits.cast.map((item, idx) => (
                <MediaItem key={`cast-${item.id}-${idx}`} {...item} />
              ))}
            </List>
          </div>
          {/* <div>
            <h4>Crew</h4>
            <List>
              {data?.combined_credits.crew.map((item, idx) => (
                <MediaItem key={`crew-${item.id}-${idx}`} {...item} />
              ))}
            </List>
          </div> */}
        </section>
      </section>
    </div>
  );
};

export default PersonDetail;
