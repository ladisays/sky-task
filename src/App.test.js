import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { routerRender, createSearchResults } from "./utils/test-utils";
import App from "./App";

describe("<App />", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("renders a search form", () => {
    routerRender(<App />);

    expect(screen.getByRole("search")).toBeInTheDocument();
    const input = screen.getByLabelText("Search");
    userEvent.type(input, "search query ");
    expect(input.value).toEqual("search query ");
  });

  it("renders search suggestions and updates filter", async () => {
    const results = createSearchResults(2);
    fetch.mockResponse(JSON.stringify({ results }));
    routerRender(<App />);

    const input = screen.getByLabelText("Search");
    userEvent.type(input, "search");
    await waitFor(() => screen.getByRole("list"));
    expect(screen.getByRole("list").children).toHaveLength(6);

    const select = screen.getByRole("combobox");
    userEvent.selectOptions(select, ["person"]);
    await waitFor(() => screen.getByRole("list"));
    expect(screen.getByRole("list").children).toHaveLength(2);
  });

  it("navigates to /search route on search submission", async () => {
    const results = createSearchResults(2);
    fetch.mockResponse(JSON.stringify({ results }));
    routerRender(<App />);

    const input = screen.getByLabelText("Search");
    userEvent.type(input, "fake string");

    userEvent.click(screen.getByRole("button", { name: "Search" }));
    await waitFor(() => screen.getByRole("list"));
    expect(window.location.href).toBe(
      `${window.location.origin}/search?query=fake%20string`
    );
  });

  it("navigates home from another route", () => {
    routerRender(<App />, { route: "/search" });
    expect(window.location.href).toBe(`${window.location.origin}/search`);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(window.location.href).toBe(`${window.location.origin}/`);
  });
});
