import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { noop } from 'lodash';

import { useStripes } from '@folio/stripes/core';
import { MenuSection, Icon, Button } from '@folio/stripes/components';

import { Delete } from './Delete';

export const Menu = ({ configurationId, onEdit = noop, onDeleted }) => {
  const intl = useIntl();
  const stripes = useStripes();

  if (!stripes.hasPerm('ui-remote-storage.settings.remote-storages.all')) return null;

  return (
    <>
      <MenuSection id="storage-details-actions">
        <Button
          id="clickable-edit-storage"
          buttonStyle="dropdownItem"
          data-test-button-edit-storage
          onClick={onEdit}
        >
          <Icon size="small" icon="edit">
            {intl.formatMessage({ id: 'ui-remote-storage.edit' })}
          </Icon>
        </Button>

        <Delete configurationId={configurationId} onSuccess={onDeleted} />
      </MenuSection>
    </>
  );
};

Menu.propTypes = {
  configurationId: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDeleted: PropTypes.func,
};
