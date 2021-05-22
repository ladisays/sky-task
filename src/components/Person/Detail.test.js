import { Route } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";

import { routerRender, createPerson } from "../../utils/test-utils";
import PersonDetail from "./Detail";

describe("<PersonDetail />", () => {
  beforeEach(() => fetch.resetMocks());
  it("renders details for a person", async () => {
    const person = createPerson(1, 3, "2020-05-19");
    fetch.mockResponse(JSON.stringify(person));

    routerRender(
      <Route path="/person/:id">
        <PersonDetail />
      </Route>,
      { route: `/person/${person.id}` }
    );
    await waitFor(() => screen.getAllByRole("heading"));

    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(2);
    headings.forEach((heading) =>
      expect(heading).toHaveTextContent(person.name)
    );

    expect(screen.getByRole("img", { name: person.name })).toHaveAttribute(
      "alt",
      person.name
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
    links.forEach((link, idx) => {
      const path = idx < 3 ? "/movie" : "/tv";
      expect(link).toHaveAttribute("href", `${path}/${idx + 1}`);
    });
  });
});
