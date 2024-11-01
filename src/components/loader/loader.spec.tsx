import { render, screen } from '@testing-library/react'
import Loader from './loader'

describe('Loader | component | unit test', () => {
  it('should render with success', () => {
    render(<Loader />)

    expect(screen.getByText('Loading...')).toBe("document")
  })
})