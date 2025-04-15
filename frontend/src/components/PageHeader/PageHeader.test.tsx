import { render, screen, fireEvent } from '@testing-library/react'
import PageHeader from './'
import { vi } from 'vitest'

describe('PageHeader', () => {
  it('renders the title and description', () => {
    render(<PageHeader />)

    expect(screen.getByText('Importação de CNAB')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Utilize o formulário abaixo para importar o arquivo CNAB/i
      )
    ).toBeInTheDocument()
  })

  it('calls onClick when the button is clicked', () => {
    const mockOnClick = vi.fn()
    render(<PageHeader onClick={mockOnClick} />)

    const button = screen.getByText('Upload de arquivo')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalled()
  })

  it('does not break if onClick is not provided', () => {
    render(<PageHeader />)

    const button = screen.getByText('Upload de arquivo')
    fireEvent.click(button)

    expect(button).toBeInTheDocument()
  })
})
