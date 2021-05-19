import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchForm from './SearchForm';

describe('<SearchForm />', () => {
  it('should submit a search query', () => {
    const onSubmit = jest.fn();

    render(<SearchForm onSubmit={onSubmit} />);

    const str = 'search string';
    const input = screen.getByLabelText('Search');

    expect(input).toBeInTheDocument();
    userEvent.type(input, str);
    expect(input.value).toEqual(str);
    
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledWith(str);
  });
});
