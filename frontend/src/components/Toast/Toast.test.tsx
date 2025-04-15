import { render, screen } from '@testing-library/react';
import Toast from './';
import '@testing-library/jest-dom';

describe('<Toast />', () => {
  it('mostra e esconde o toast corretamente', async () => {
    render(<Toast />);

    const event = new CustomEvent('show-toast', {
      detail: {
        message: 'Toast funcionando!',
        type: 'success',
        visible: true,
      },
    }) as CustomEvent;

    window.dispatchEvent(event);

    expect(await screen.findByText('Toast funcionando!')).toBeInTheDocument();
  });
});
