import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { server, rest, API_BASE } from '../../../test/net';
import { renderAPIHook, ERROR_RESPONSE } from '../setup'; // must be imported before the tested hooks

import { useUpdateMutation, useListQuery } from '../../Configurations';


const data = {
  id: 42,
  name: 'RS1',
  providerName: 'DEMATIC_EMS',
};

const url = {
  update: `${API_BASE}/configurations/${data.id}`,
  list: `${API_BASE}/configurations`,
};

let request;

beforeEach(() => {
  request = undefined;
  server.use(rest.put(
    url.update,
    (req, res, ctx) => {
      request = req;

      return res(ctx.status(201)); // "Created"
    },
  ));
});


it('PUTs data to server', async () => {
  const { result } = renderAPIHook(() => useUpdateMutation({ id: data.id }));

  result.current.mutate(data);

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  expect(request?.body).toEqual(data);
});

describe('Invalidation of List query', () => {
  const checkListInvalidatedOn = async () => {
    const { result } = renderAPIHook(() => useUpdateMutation({ id: data.id }));

    const listQueryHook = renderAPIHook(useListQuery);

    await waitFor(() => listQueryHook.result.current.isFetching);
    await waitFor(() => !listQueryHook.result.current.isFetching && listQueryHook.result.current.isSuccess);

    const fetchCountBefore = listQueryHook.result.current.dataUpdatedAt;

    result.current.mutate(data);

    await waitFor(() => listQueryHook.result.current.dataUpdatedAt > fetchCountBefore);

    return true;
  };

  beforeEach(() => {
    server.use(rest.get(url.list, (req, res, ctx) => res(ctx.json({
      configurations: [1, 2, 3],
    }))));
  });

  it('is made on success', async () => {
    expect(await checkListInvalidatedOn('success')).toBeTruthy();
  });

  it('is made on error', async () => {
    server.use(rest.put(url.update, ERROR_RESPONSE));

    expect(await checkListInvalidatedOn('error')).toBeTruthy();
  });
});
