import { useState } from 'react';
import noop from 'lodash/noop';

import { useShowCallout } from '@folio/stripes-acq-components';

import { Configurations, Mappings } from '../../API';
import { useConfirmationModal } from '../../util/useConfirmationModal';

export const useScenario = ({ configurationId, onSuccess = noop }) => {
  const showCallout = useShowCallout();
  const confirmation = useConfirmationModal();

  const [isPending, setIsPending] = useState(false);

  const configurationQuery = Configurations.useSingleQuery({
    id: configurationId,
    enabled: isPending,
  });

  const mappingsQuery = Mappings.useListQuery({ enabled: isPending });

  const { mutate } = Configurations.useDeleteMutation({
    id: configurationId,
    onSuccess: () => {
      showCallout({ messageId: 'ui-remote-storage.remove.success' });
      onSuccess();
    },
    onError: () => {
      showCallout({ messageId: 'ui-remote-storage.remove.error', type: 'error' });
    },
  });

  const isLoading = mappingsQuery.isFetching || configurationQuery.isLoading;
  const isError = mappingsQuery.isError || configurationQuery.isError;
  const isDeletePossible =
    mappingsQuery.isSuccess &&
    !mappingsQuery.mappings.some(item => item.configurationId === configurationId);

  const start = () => {
    setIsPending(true);

    return confirmation.wait()
      .then(mutate)
      .catch(noop)
      .finally(() => setIsPending(false));
  };

  return {
    start,
    props: {
      configuration: configurationQuery.configuration,
      isError,
      isLoading,
      isDeletePossible,
      ...confirmation.props,
    },
  };
};
