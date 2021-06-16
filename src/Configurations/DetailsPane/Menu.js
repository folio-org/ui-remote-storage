import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';

import { ActionMenu } from '../../components';


const tableIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M31.4 5.415a3.188 2.973 0 00-.861-.802 3.188 2.973 0 00-1.786-.506H3.247a3.188 2.973 0 00-1.786.506 3.188 2.973 0 00-.86.802A3.188 2.973 0 00.057 7.08v17.84a3.188 2.973 0 003.189 2.973h25.506a3.188 2.973 0 003.189-2.973V7.08a3.188 2.973 0 00-.542-1.665zM3.247 10.054h11.159V16H3.246v-5.946zm0 14.866v-5.947h11.159v5.947H3.246zm25.506 0H17.594v-5.947h11.16v5.947zm0-8.92H17.594v-5.946h11.16V16z" />
  </svg>
);


export const Menu = ({ onEdit, onDelete, onOpenTable, ...rest }) => {
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
      {onOpenTable && (
        <ActionMenu.Item
          id="clickable-open-accession-table"
          icon={tableIcon}
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
  onOpenTable: PropTypes.func,
};
