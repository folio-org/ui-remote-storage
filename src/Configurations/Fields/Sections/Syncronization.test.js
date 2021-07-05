import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Form } from 'react-final-form';

import { Synchronization } from './Synchronization';


const renderSynchronization = () => render(
  <Form onSubmit={() => {}}>
    {() => <Synchronization isNonInteractive={false} />}
  </Form>,
);


describe('Data synchronization schedule delay', () => {
  const validValues = ['1', '2', String(Number.MAX_SAFE_INTEGER)];
  const invalidValues = ['0', '-1', '3.14', '.2', '-0.2', 'abc'];

  it.each(validValues)('shows no error when valid', value => {
    renderSynchronization();

    const input = screen.getByRole('spinbutton');

    user.type(input, value);
    user.tab();

    expect(screen.queryByText(/synchronization.schedule.info.notValid/)).not.toBeInTheDocument();
  });

  it.each(invalidValues)('shows error message when not valid', value => {
    renderSynchronization();

    const input = screen.getByRole('spinbutton');

    user.type(input, value);
    user.tab();

    const alert = screen.getAllByRole('alert')[0];
    expect(alert).toHaveTextContent(/synchronization.schedule.info.notValid/);
  });
});
