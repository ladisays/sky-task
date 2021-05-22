import { screen } from "@testing-library/react";

import { routerRender, createSearchResults } from "../../utils/test-utils";
import SearchResults from "./SearchResults";

describe("<SearchResults />", () => {
  it("should render empty message", () => {
    routerRender(<SearchResults />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "No results to display"
    );
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders results", () => {
    const results = createSearchResults(3);
    routerRender(<SearchResults results={results} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(9);
  });
});
