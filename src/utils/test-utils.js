import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export const routerRender = (ui, { route = "/" } = {}) => {
  window.history.pushState(null, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

let counter = 1;
export const mapper = (count, ...builders) => {
  return builders.reduce((acc, builder) => {
    const arr = [...Array(count)].map(() => builder(counter++));
    return acc.concat(arr);
  }, []);
};

const buildMovie = (id) => ({
  id,
  title: `Movie Title ${id}`,
  overview: `Overview for movie ${id}`,
  poster_path: `/movie-poster-${id}.jpg`,
  release_date: "2021-05-19",
});
const buildTV = (id) => ({
  id,
  name: `TV Show ${id}`,
  overview: `Overview for tv show ${id}`,
  poster_path: `/tv-poster-${1}.jpg`,
  first_air_date: "2021-05-19",
});
const buildPerson = (id) => ({
  id,
  name: `Person ${id}`,
  profile_path: `/person-profile-${id}.jpg`,
  known_for_department: "Acting",
});
export const buildMovieItem = (id) => ({
  ...buildMovie(id),
  media_type: "movie",
});
export const buildTVItem = (id) => ({
  ...buildTV(id),
  media_type: "tv",
});
export const buildPersonItem = (id) => ({
  ...buildPerson(id),
  media_type: "person",
});
export const createMovie = (id, cast_count = 5) => ({
  ...buildMovie(id),
  runtime: 80,
  tagline: `Tagline for movie ${id}`,
  credits: {
    cast: mapper(cast_count, buildPersonItem),
  },
});
export const createTVShow = (id, cast_count = 5) => ({
  ...buildTV(id),
  episode_run_time: [45],
  tagline: `Tagline for tv ${id}`,
  credits: {
    cast: mapper(cast_count, buildPersonItem),
  },
});
export const createPerson = (id, cast_count = 5, deathday = null) => ({
  ...buildPerson(id),
  birthday: "2021-05-19",
  deathday,
  place_of_birth: `Birthplace ${id}`,
  also_known_as: ["Another name 1", "Another name 2"],
  biography: `Biography for person ${id}`,
  combined_credits: {
    cast: mapper(cast_count, buildMovieItem, buildTVItem),
  },
});

export const createSearchResults = (count = 3) =>
  mapper(count, buildMovieItem, buildPersonItem, buildTVItem);
