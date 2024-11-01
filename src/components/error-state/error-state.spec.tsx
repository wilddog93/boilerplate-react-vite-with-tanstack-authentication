import { render, screen } from '@testing-library/react'
import ErrorState from './error-state'

describe('ErrorState | component | unit test', () => {
  it('should render with success', () => {
    render(<ErrorState />)

    expect(
      screen.getByText('An internal error occurred on the server')
    ).toBe("document")
  })

  describe('when text is passed', () => {
    it('should render with success', () => {
      render(<ErrorState text="Custom error message" />)

      expect(screen.getByText('Custom error message')).toBe("document")
    })
  })
})