import React from 'react';
import { Form } from 'react-final-form';
import { IntlProvider } from 'react-intl';

import { render, screen } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import { Synchronization } from './Synchronization';


const renderSynchronization = () => render(
  <IntlProvider locale="en">
    <Form onSubmit={() => {}}>
      {() => <Synchronization isNonInteractive={false} />}
    </Form>
  </IntlProvider>,
);


describe('Data synchronization schedule delay', () => {
  const validValues = ['1', '2', String(Number.MAX_SAFE_INTEGER)];
  const invalidValues = ['0', '-1', '3.14', '.2', '-0.2', 'abc'];

  it.each(validValues)('shows no error when valid', async value => {
    renderSynchronization();

    const input = screen.getByRole('spinbutton');

    await user.type(input, value);
    await user.tab();

    expect(screen.queryByText(/synchronization.schedule.info.notValid/)).not.toBeInTheDocument();
  });

  it.each(invalidValues)('shows error message when not valid', async value => {
    renderSynchronization();

    const input = screen.getByRole('spinbutton');

    await user.type(input, value);
    await user.tab();

    const alert = screen.getAllByRole('alert')[0];
    expect(alert).toHaveTextContent(/synchronization.schedule.info.notValid/);
  });
});
