import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { noop } from 'lodash';

import { Pane } from '@folio/stripes/components';

import { ErrorCentered, LoadingCentered } from '../../components';
import { Configurations } from '../../data';
import { Fields } from '../Fields';
import * as Delete from '../Delete';
import { Menu } from './Menu';
import { CAIASOFT } from '../../const';

export const DetailsPane = ({ configurationId, onEdit, onClose, onOpenTable, defaultWidth = 'fill', ...rest }) => {
  const DeleteScenario = Delete.useScenario({ configurationId, onSuccess: onClose });

  const query = Configurations.useSingleQuery({ id: configurationId });

  const isCaiasoft = query.configuration.providerName === CAIASOFT;

  const renderActionMenu = props => query.isSuccess && (
    <Menu
      onEdit={onEdit}
      onDelete={DeleteScenario.start}
      onOpenTable={isCaiasoft ? onOpenTable : undefined}
      {...props}
    />
  );

  return (
    <>
      <Pane
        data-testid="storage-details-pane"
        actionMenu={renderActionMenu}
        onClose={onClose}
        paneTitle={query.configuration?.name}
        defaultWidth={defaultWidth}
        dismissible
        {...rest}
      >
        {
          (query.isLoading && <LoadingCentered />)
          || (query.isError && <ErrorCentered />)
          || (
            <Form onSubmit={noop} initialValues={query.configuration}>
              {() => <Fields isNonInteractive />}
            </Form>
          )
        }
      </Pane>
      <Delete.UI {...DeleteScenario.props} />
    </>
  );
};

DetailsPane.propTypes = {
  ...Pane.propTypes,
  configurationId: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
};
