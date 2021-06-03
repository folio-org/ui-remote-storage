import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import { List } from './List';
import { Menu } from './Menu';

export const ListPane = ({ defaultWidth = '50%', onCreate, openDetails, ...rest }) => (
  <Pane
    paneTitle={<FormattedMessage id="ui-remote-storage.configurations.title" />}
    defaultWidth={defaultWidth}
    lastMenu={<Menu onNew={onCreate} />}
    {...rest}
  >
    <List onRowClick={openDetails} />
  </Pane>
);

ListPane.propTypes = {
  ...Pane.propTypes,
  onCreate: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired,
};
