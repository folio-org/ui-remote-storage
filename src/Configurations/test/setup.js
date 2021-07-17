import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { render } from '@testing-library/react';

import { CONFIGURATIONS_PATH } from '../../const';
import { Configurations } from '../Configurations';
import { API_BASE, Provider } from '../../test/net';

export const renderConfigurations = route => {
  const path = [CONFIGURATIONS_PATH, route].join('');

  window.history.pushState({}, 'Test page', path);

  return render(
    (
      <BrowserRouter>
        <IntlProvider locale="en">
          <Configurations />
        </IntlProvider>
      </BrowserRouter>
    ),
    { wrapper: Provider },
  );
};

export const url = {
  providers: `${API_BASE}/providers`,
  configurations: {
    single: `${API_BASE}/configurations/1`,
    list: `${API_BASE}/configurations`,
  },
};

export const ERROR_RESPONSE = (req, res, ctx) => res(ctx.status(500));
