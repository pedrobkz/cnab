import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './';
import { vi } from 'vitest';

describe('Modal', () => {
  const mockOnClose = vi.fn();
  const mockOnUpload = vi.fn();
  const mockOnSubmit = vi.fn();

  const setup = (isOpen = true, fileName = '') => {
    render(
      <Modal
        isOpen={isOpen}
        onClose={mockOnClose}
        onUpload={mockOnUpload}
        onSubmit={mockOnSubmit}
        fileName={fileName}
      />
    );
  };

  it('does not render when isOpen is false', () => {
    setup(false);
    expect(
      screen.queryByText('Upload do Arquivo CNAB')
    ).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    setup(true);
    expect(screen.getByText('Upload do Arquivo CNAB')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    setup(true);
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onUpload when a file is selected', () => {
    setup(true);

    const fileInput = screen.getByLabelText(
      'Escolher Arquivo'
    ) as HTMLInputElement;

    const file = new File(['mocked content'], 'file.txt', {
      type: 'text/plain',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockOnUpload).toHaveBeenCalled();
  });

  it('calls onSubmit when fileName is present and button is clicked', () => {
    setup(true, 'file.txt');

    const sendButton = screen.getByText('Enviar');
    fireEvent.click(sendButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('submit button is disabled if no fileName', () => {
    setup(true);
    const sendButton = screen.getByText('Enviar') as HTMLButtonElement;
    expect(sendButton).toBeDisabled();
  });
});
