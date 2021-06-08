import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';

import { ActionMenu } from '../../components';

export const Menu = ({ onEdit, onDelete, onOpenTable, isCaiasoft, ...rest }) => {
  const intl = useIntl();

  return (
    <ActionMenu.Menu id="storage-details-actions" {...rest}>
      <IfPermission perm="ui-remote-storage.settings.remote-storages.edit">
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
      </IfPermission>
      {isCaiasoft && (
        <ActionMenu.Item
          id="clickable-open-accession-table"
          label={intl.formatMessage({ id: 'ui-remote-storage.accession-tables.open' })}
          onClick={onOpenTable}
        />
      )}
    </ActionMenu.Menu>
  );
};

Menu.propTypes = {
  ...ActionMenu.Menu.propTypes,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
