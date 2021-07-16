import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { Paneset } from '@folio/stripes/components';
import * as components from '@folio/stripes-acq-components';

import { EditorLayer } from './EditorLayer';
import { API_BASE, Provider, rest, server } from '../../test/net';
import { ERROR_RESPONSE } from '../../API/test/setup';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useShowCallout: jest.fn(),
}));


const renderLayer = (create) => {
  const handleClose = () => true;

  return render(
    <Provider>
      <BrowserRouter>
        <IntlProvider locale="en">
          <Paneset paneTitle="ok">
            <EditorLayer configurationId="id" create={create} onClose={handleClose} />
          </Paneset>
        </IntlProvider>
      </BrowserRouter>

    </Provider>,
  );
};

describe('EditorLayer', () => {
  it('`useSingleQuery` fires showCalloutHook if any error', async () => {
    server.use(rest.get(`${API_BASE}/configurations/id`, ERROR_RESPONSE));

    const spy = jest.spyOn(components, 'useShowCallout').mockImplementation(() => jest.fn());

    renderLayer(false);

    expect(spy).toBeCalledTimes(1);
  });
});
