import { Route } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";

import { routerRender, createTVShow } from "../../utils/test-utils";
import TVDetail from "./Detail";

describe("<TVDetail />", () => {
  beforeEach(() => fetch.resetMocks());
  it("renders details for a tv show", async () => {
    const show = createTVShow(1, 3);
    fetch.mockResponse(JSON.stringify(show));

    routerRender(
      <Route path="/tv/:id">
        <TVDetail />
      </Route>,
      { route: `/tv/${show.id}` }
    );
    await waitFor(() => screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toHaveTextContent(show.name);
    expect(screen.getByRole("img", { name: show.name })).toHaveAttribute(
      "alt",
      show.name
    );
    expect(screen.getByRole("list").children).toHaveLength(3);
    expect(screen.getByText("45m")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    links.forEach((link, idx) =>
      expect(link).toHaveAttribute("href", `/person/${idx + 1}`)
    );
  });
});
