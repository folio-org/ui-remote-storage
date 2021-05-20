import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { noop } from 'lodash';

import { Icon, Button } from '@folio/stripes/components';
import { useShowCallout } from '@folio/stripes-acq-components';

import { Configurations } from '../../../API';
import { useConfirmationModal } from '../../../util/useConfirmationModal';
import { DeleteConfirmation } from './DeleteConfirmation';

export const Delete = ({ configurationId, onSuccess = noop }) => {
  const intl = useIntl();
  const showCallout = useShowCallout();

  const confirmation = useConfirmationModal();

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

  const handleClick = () => confirmation.wait().then(mutate).catch(noop);

  return (
    <>
      <Button
        id="clickable-delete-storage"
        buttonStyle="dropdownItem"
        data-test-button-delete-storage
        onClick={handleClick}
      >
        <Icon size="small" icon="trash">
          {intl.formatMessage({ id: 'ui-remote-storage.delete' })}
        </Icon>
      </Button>

      <DeleteConfirmation configurationId={configurationId} {...confirmation.props} />
    </>
  );
};

Delete.propTypes = {
  configurationId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};
