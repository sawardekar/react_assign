import React from 'react'
import UserList from './UserList'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup);

test('caption render for user detail page', () => {
const UserListComponent = render(<UserList/>);
const captionEl = UserListComponent.getByTestId('caption');

expect(captionEl.textContent).toBe('list of Users')

})