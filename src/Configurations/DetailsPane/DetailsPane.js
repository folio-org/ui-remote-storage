import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { noop } from 'lodash';

import { Pane } from '@folio/stripes/components';

import { LoadingCentered } from '../../components';
import { Configurations } from '../../API';
import { Fields } from '../Fields';
import { Menu } from './Menu';

export const DetailsPane = ({ configurationId, onEdit, onClose, defaultWidth = 'fill', ...rest }) => {
  const query = Configurations.useSingleQuery({ id: configurationId });

  const renderActionMenu = () => query.isSuccess && (
    <Menu
      configurationId={configurationId}
      onEdit={onEdit}
      onDeleted={onClose}
    />
  );

  return (
    <Pane
      data-testid="storage-details-pane"
      actionMenu={renderActionMenu}
      onClose={onClose}
      paneTitle={query.configuration?.name}
      defaultWidth={defaultWidth}
      dismissible
      {...rest}
    >
      {query.isLoading
        ? <LoadingCentered />
        : (
          <Form onSubmit={noop} initialValues={query.configuration}>
            {() => <Fields isNonInteractive />}
          </Form>
        )
      }
    </Pane>
  );
};

DetailsPane.propTypes = {
  ...Pane.propTypes,
  configurationId: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
};
