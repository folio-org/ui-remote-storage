// This should be imported before the tested hooks
import { server, rest, API_BASE } from '../../../test/net';
import { renderAPIHook, ERROR_RESPONSE } from '../setup'; // must be imported before the tested hooks

import { useListQuery, useSingleQuery } from '../../Configurations';


const id = 42;
const url = {
  single: `${API_BASE}/configurations/${id}`,
  list: `${API_BASE}/configurations`,
};


describe('on success', () => {
  beforeEach(() => {
    server.use(rest.get(url.single, (req, res, ctx) => res(ctx.json({
      field1: 'field1',
      field2: 'field2',
    }))));
  });

  it('returns configuration by id when loaded', async () => {
    const { result, waitFor } = renderAPIHook(() => useSingleQuery({ id }));

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => result.current.isSuccess);
    expect(result.current.configuration).toEqual({
      field1: 'field1',
      field2: 'field2',
    });
  });

  it('returns empty object while loading', () => {
    const { result } = renderAPIHook(() => useSingleQuery({ id }));

    expect(result.current.configuration).toEqual({});
    expect(result.current.isLoading).toBeTruthy();
  });
});


describe('on error', () => {
  beforeEach(() => {
    server.use(rest.get(url.single, ERROR_RESPONSE));
  });

  it('returns empty object', async () => {
    const { result, waitFor } = renderAPIHook(() => useSingleQuery({ id: '42' }));

    await waitFor(() => result.current.isError);
    expect(result.current.configuration).toEqual({});
  });

  it.only('invalidates List query', async () => {
    server.use(rest.get(url.list, (req, res, ctx) => res(ctx.json({
      configurations: [1, 2, 3],
    }))));

    const { result, waitFor } = renderAPIHook(useListQuery);

    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching && result.current.isSuccess);

    const singleQueryHook = renderAPIHook(() => useSingleQuery({ id: '42' }));

    await waitFor(() => singleQueryHook.result.current.isError);
    await waitFor(() => expect(result.current.isFetching).toBeTruthy());
  });
});
