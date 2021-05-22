import { screen } from "@testing-library/react";

import { routerRender, createSearchResults } from "../../utils/test-utils";
import Item from "./Item";

describe("<Item />", () => {
  const results = createSearchResults(1);
  it("should render the appropriate item", () => {
    const { rerender } = routerRender(<Item {...results[0]} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/1");

    rerender(<Item {...results[1]} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/person/2");

    rerender(<Item {...results[2]} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/tv/3");

    rerender(<Item />);
    expect(screen.getByRole("listitem")).toHaveTextContent("Other media");
  });
});
