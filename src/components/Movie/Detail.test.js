import { Route } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";

import { routerRender, createMovie } from "../../utils/test-utils";
import MovieDetail from "./Detail";

describe("<MovieDetail />", () => {
  beforeEach(() => fetch.resetMocks());
  it("renders details for a movie", async () => {
    const movie = createMovie(1, 3);
    fetch.mockResponse(JSON.stringify(movie));

    routerRender(
      <Route path="/movie/:id">
        <MovieDetail />
      </Route>,
      { route: `/movie/${movie.id}` }
    );
    await waitFor(() => screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toHaveTextContent(movie.title);
    expect(screen.getByRole("img", { name: movie.title })).toHaveAttribute(
      "alt",
      movie.title
    );
    expect(screen.getByRole("list").children).toHaveLength(3);
    expect(screen.getByText("1h 20m")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    links.forEach((link, idx) =>
      expect(link).toHaveAttribute("href", `/person/${idx + 1}`)
    );
  });
});
