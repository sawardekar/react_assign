import React from 'react'
import UserForm from './UserForm'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);
const props = {
    match: {
      params: { id: 1 }
    }
  }
test('caption render for user detail page', () => {
const UserFormComponent = render(<UserForm {...props}/>);
const captionEl = UserFormComponent.getByTestId('caption');

expect(captionEl.textContent).toBe(' User Edit Form ')

const usernameEl = UserFormComponent.container.querySelector('#username');

expect(usernameEl.nodeValue).toMatch('Leanne Graham')

})