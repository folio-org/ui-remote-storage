import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { PaneMenu, Button } from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

export const Menu = ({ onNew }) => (
  <IfPermission perm="ui-remote-storage.settings.remote-storages.edit">
    <PaneMenu>
      <Button
        data-testid="new-remote-storage"
        onClick={onNew}
        buttonStyle="primary"
        marginBottom0
      >
        <FormattedMessage id="stripes-smart-components.new" />
      </Button>
    </PaneMenu>
  </IfPermission>
);

Menu.propTypes = {
  onNew: PropTypes.func.isRequired,
};
