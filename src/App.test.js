import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('<App />', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    consoleSpy.mockRestore();
  });
  it('renders a search form', () => {
    render(<App />);

    expect(screen.getByRole('search')).toBeInTheDocument();
    const input = screen.getByLabelText('Search');
    userEvent.type(input, 'search query ');
    expect(input.value).toEqual('search query ');

    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(consoleSpy).toHaveBeenCalledWith('search query');
  });
});
