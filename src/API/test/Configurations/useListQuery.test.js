// This should be imported before the tested hooks
import { server, rest, renderAPIHook, ERROR_RESPONSE } from '../setup';

import { useListQuery } from '../../Configurations';


const url = 'http://test/remote-storage/configurations';

beforeEach(() => {
  server.use(rest.get(url, (req, res, ctx) => res(ctx.json({
    configurations: [1, 2, 3],
  }))));
});


it('returns list of configurations when loaded', async () => {
  const { result, waitFor } = renderAPIHook(useListQuery);

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => result.current.isSuccess);
  expect(result.current.configurations).toEqual([1, 2, 3]);
});

it('returns empty list while loading', () => {
  const { result } = renderAPIHook(useListQuery);

  expect(result.current.configurations).toEqual([]);
  expect(result.current.isLoading).toBeTruthy();
});

it('returns empty list on error', async () => {
  server.use(rest.get(url, ERROR_RESPONSE));

  const { result, waitFor } = renderAPIHook(useListQuery);

  await waitFor(() => result.current.isError);
  expect(result.current.configurations).toEqual([]);
});
