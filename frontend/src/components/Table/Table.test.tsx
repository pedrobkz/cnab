import { render, screen, fireEvent } from '@testing-library/react';
import Table from './';
import { vi } from 'vitest';

describe('Table component', () => {
  const headers = [
    { key: 'name', label: 'Nome' },
    { key: 'value', label: 'Valor' },
  ];

  const body = [
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: -5 },
  ];

  it('renders headers and rows', () => {
    render(<Table headers={headers} body={body} />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('-5.00')).toBeInTheDocument();
  });

  it('calls onClickRow when a row is clicked', () => {
    const mockClick = vi.fn();

    render(<Table headers={headers} body={body} onClickRow={mockClick} />);

    fireEvent.click(screen.getByText('Item 1'));

    expect(mockClick).toHaveBeenCalledWith(body[0]);
  });

  it('renders expanded row when expandedRowKey matches', () => {
    const expandedContent = 'Conteúdo expandido';

    render(
      <Table
        headers={headers}
        body={body}
        expandedRowKey={1}
        expandedRowRender={() => <div>{expandedContent}</div>}
      />
    );

    expect(screen.getByText(expandedContent)).toBeInTheDocument();
  });
});
