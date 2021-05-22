import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchForm from "./SearchForm";

describe("<SearchForm />", () => {
  it("should submit a search query", () => {
    const onSubmit = jest.fn();
    const onFilter = jest.fn();
    const onClear = jest.fn();

    render(
      <SearchForm
        onSubmit={onSubmit}
        onFilter={onFilter}
        onClear={onClear}
        filter="all"
      >
        <div data-testid="child">Test</div>
      </SearchForm>
    );

    const str = "search string";
    const input = screen.getByLabelText("Search");

    expect(screen.getByTestId("child")).toHaveTextContent("Test");

    expect(input).toBeInTheDocument();
    userEvent.type(input, str);
    expect(input.value).toEqual(str);
    expect(onSubmit).toHaveBeenCalledWith("suggest", str);

    userEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalledWith("submit", str);

    const select = screen.getByRole("combobox");
    expect(select.value).toBe("all");
    userEvent.selectOptions(select, ["person"]);
    expect(onFilter).toHaveBeenCalledWith("person");
  });
});
