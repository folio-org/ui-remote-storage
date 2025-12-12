import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { server, rest, API_BASE } from '../../../test/net';
import { renderAPIHook, ERROR_RESPONSE } from '../setup'; // must be imported before the tested hooks

import { useCreateMutation, useListQuery } from '../../Configurations';


const data = {
  name: 'RS1',
  providerName: 'DEMATIC_EMS',
};

const url = {
  create: `${API_BASE}/configurations`,
  list: `${API_BASE}/configurations`,
};

let request;

beforeEach(() => {
  request = undefined;
  server.use(rest.post(
    url.create,
    (req, res, ctx) => {
      request = req;

      return res(ctx.status(201)); // "Created"
    },
  ));
});


it('POSTs data to server', async () => {
  const { result } = renderAPIHook(useCreateMutation);

  result.current.mutate(data);

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  expect(request?.body).toEqual(data);
});

describe('Invalidation of List query', () => {
  const checkListInvalidatedOn = async () => {
    const { result } = renderAPIHook(useCreateMutation);

    const listQueryHook = renderAPIHook(useListQuery);

    await waitFor(() => listQueryHook.result.current.isFetching);
    await waitFor(() => !listQueryHook.result.current.isFetching && listQueryHook.result.current.isSuccess);

    const fetchCountBefore = listQueryHook.result.current.dataUpdatedAt;

    result.current.mutate(data);

    await waitFor(() => {
      expect(listQueryHook.result.current.dataUpdatedAt).toBeGreaterThan(fetchCountBefore);
    });
  };

  beforeEach(() => {
    server.use(rest.get(url.list, (req, res, ctx) => res(ctx.json({
      configurations: [1, 2, 3],
    }))));
  });

  it('is made on success', async () => {
    await checkListInvalidatedOn();
  });

  it('is made on error', async () => {
    server.use(rest.post(url.create, ERROR_RESPONSE));

    await checkListInvalidatedOn();
  });
});
