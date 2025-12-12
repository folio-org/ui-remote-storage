import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { server, rest, API_BASE } from '../../../test/net';
import { renderAPIHook, ERROR_RESPONSE } from '../setup'; // must be imported before the tested hooks

import { useDeleteMutation, useListQuery } from '../../Configurations';


const id = 42;
const url = {
  delete: `${API_BASE}/configurations/${id}`,
  list: `${API_BASE}/configurations`,
};


beforeEach(() => {
  server.use(rest.delete(
    url.delete,
    (req, res, ctx) => res(ctx.status(204)), // "No Content"
  ));
});


it('DELETESs data from server', async () => {
  const { result } = renderAPIHook(() => useDeleteMutation({ id }));

  result.current.mutate();

  await expect(waitFor(() => result.current.isSuccess)).resolves.not.toThrow();
});


describe('Invalidation of List query', () => {
  const checkListInvalidatedOn = async () => {
    const { result } = renderAPIHook(() => useDeleteMutation({ id }));

    const listQueryHook = renderAPIHook(useListQuery);

    await waitFor(() => listQueryHook.result.current.isFetching);
    await waitFor(() => !listQueryHook.result.current.isFetching && listQueryHook.result.current.isSuccess);

    const fetchCountBefore = listQueryHook.result.current.dataUpdatedAt;

    result.current.mutate();

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
    server.use(rest.delete(url.delete, ERROR_RESPONSE));

    await checkListInvalidatedOn();
  });
});
