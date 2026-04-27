import { render, screen } from '@testing-library/react'
import {ReviewPage} from "../ReviewPage.tsx";

describe('FormComponent', () => {

  // TEST 1 — Fields render correctly
  it('should render describe text box', () => {
    render(<ReviewPage/>)

    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();

  })
    it('should display Enter Rating', () => {
        render(<ReviewPage/>)
        expect(screen.getByRole('heading', {name:/Enter Rating/i})).toBeInTheDocument()
    });
    it('should display Submit Review Button', () => {
    render(<ReviewPage/>)
    expect(screen.getByRole('button', {name:/Submit Review/i})).toBeInTheDocument()
    });



    // // TEST 2 — Form submits correct data
  // it('should call onSubmit with form data when submitted', async () => {
  //   const mockSubmit = vi.fn()
  //   render(<FormComponent onSubmit={mockSubmit} />)
  //
  //   await userEvent.type(screen.getByPlaceholderText('Field 1'), 'Value 1')
  //   await userEvent.type(screen.getByPlaceholderText('Field 2'), 'Value 2')
  //   await userEvent.type(screen.getByPlaceholderText('Field 3'), 'Value 3')
  //   await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  //
  //   expect(mockSubmit).toHaveBeenCalledWith({
  //     field1: 'Value 1',
  //     field2: 'Value 2',
  //     field3: 'Value 3'
  //   })
  // })
})


