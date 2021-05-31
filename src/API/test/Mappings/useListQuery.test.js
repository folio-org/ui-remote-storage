import { server, rest, API_BASE } from '../../../test/net';
import { renderAPIHook, ERROR_RESPONSE } from '../setup'; // must be imported before the tested hooks

import { useListQuery } from '../../Mappings';


const url = `${API_BASE}/mappings`;

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
