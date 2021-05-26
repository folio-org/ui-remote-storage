// This should be imported before the tested hooks
import { server, rest, renderAPIHook, ERROR_RESPONSE } from '../setup';

import { useListQuery } from '../../Mappings';


const url = 'http://test/remote-storage/mappings';

beforeEach(() => {
  server.use(rest.get(url, (req, res, ctx) => res(ctx.json({
    mappings: [1, 2, 3],
  }))));
});


it('returns list of mappings when loaded', async () => {
  const { result, waitFor } = renderAPIHook(useListQuery);

  expect(result.current.isLoading).toBeTruthy();

  await waitFor(() => result.current.isSuccess);
  expect(result.current.mappings).toEqual([1, 2, 3]);
});

it('returns empty list while loading', () => {
  const { result } = renderAPIHook(useListQuery);

  expect(result.current.mappings).toEqual([]);
  expect(result.current.isLoading).toBeTruthy();
});

it('returns empty list on error', async () => {
  server.use(rest.get(url, ERROR_RESPONSE));

  const { result, waitFor } = renderAPIHook(useListQuery);

  await waitFor(() => result.current.isError);
  expect(result.current.mappings).toEqual([]);
});
