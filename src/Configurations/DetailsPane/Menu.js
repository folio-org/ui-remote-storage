import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { ActionMenu } from '../../components';

export const Menu = ({ onEdit, onDelete, keyHandler: _keyHandler, ...rest }) => {
  const intl = useIntl();

  return (
    <ActionMenu.Menu id="storage-details-actions" {...rest}>
      <ActionMenu.Item
        id="clickable-edit-storage"
        icon="edit"
        label={intl.formatMessage({ id: 'ui-remote-storage.edit' })}
        data-test-button-edit-storage
        onClick={onEdit}
      />
      <ActionMenu.Item
        id="clickable-delete-storage"
        icon="trash"
        label={intl.formatMessage({ id: 'ui-remote-storage.delete' })}
        data-test-button-delete-storage
        onClick={onDelete}
      />
    </ActionMenu.Menu>
  );
};

Menu.propTypes = {
  ...ActionMenu.Menu.propTypes,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
