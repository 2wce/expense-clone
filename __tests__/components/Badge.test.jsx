import { render, screen, within } from '@testing-library/react'
import Badge, { defaultClassName } from 'components/Badge'
import { describe, expect, test } from 'vitest'

describe('Badge', () => {
  test('render with props', () => {
    const { container } = render(<Badge className="testclass" text="basic" />)
    expect(container.querySelector('.testclass').className).toBe(
      `${defaultClassName} testclass`
    )
    expect(container.querySelector('.testclass').textContent).toBe('basic')
  })
})
