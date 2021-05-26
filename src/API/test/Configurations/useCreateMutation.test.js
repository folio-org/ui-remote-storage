// This should be imported before the tested hooks
import { server, rest, renderAPIHook, ERROR_RESPONSE } from '../setup';

import { useCreateMutation, useListQuery } from '../../Configurations';


const data = {
  name: 'RS1',
  providerName: 'DEMATIC_EMS',
};

const url = {
  create: 'http://test/remote-storage/configurations',
  list: 'http://test/remote-storage/configurations',
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
  const { result, waitFor } = renderAPIHook(useCreateMutation);

  result.current.mutate(data);

  await waitFor(() => result.current.isSuccess);
  expect(request?.body).toEqual(data);
});

describe('Invalidation of List query', () => {
  const checkListInvalidatedOn = async (status) => {
    const { result, waitFor } = renderAPIHook(useCreateMutation);

    const listQueryHook = renderAPIHook(useListQuery);

    await waitFor(() => listQueryHook.result.current.isFetching);
    await waitFor(() => !listQueryHook.result.current.isFetching && listQueryHook.result.current.isSuccess);

    result.current.mutate(data);

    // await waitFor(() => result.current.isSuccess);
    await waitFor(() => result.current.status === status);

    return listQueryHook.result.current.isFetching;
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
    server.use(rest.post(url.create, ERROR_RESPONSE));

    expect(await checkListInvalidatedOn('error')).toBeTruthy();
  });
});
