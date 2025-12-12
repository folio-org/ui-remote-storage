import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

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
    const { result } = renderAPIHook(() => useSingleQuery({ id }));

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
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
    const { result } = renderAPIHook(() => useSingleQuery({ id: '42' }));

    await waitFor(() => expect(result.current.isError).toBeTruthy());
    expect(result.current.configuration).toEqual({});
  });

  it('invalidates List query', async () => {
    server.use(rest.get(url.list, (req, res, ctx) => res(ctx.json({
      configurations: [1, 2, 3],
    }))));

    const { result } = renderAPIHook(useListQuery);

    await waitFor(() => result.current.isFetching);
    await waitFor(() => expect(!result.current.isFetching && result.current.isSuccess).toBeTruthy());

    const fetchCountBefore = result.current.dataUpdatedAt;

    const singleQueryHook = renderAPIHook(() => useSingleQuery({ id: '42' }));

    await waitFor(() => expect(singleQueryHook.result.current.isError).toBeTruthy());

    await waitFor(() => {
      expect(result.current.dataUpdatedAt > fetchCountBefore).toBeTruthy();
    });
  });
});
