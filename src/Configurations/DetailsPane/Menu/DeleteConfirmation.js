import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Button as OriginalButton,
  Modal,
  ModalFooter,
} from '@folio/stripes/components';

import { Configurations, Mappings } from '../../../API';
import { LoadingCentered } from '../../../components';


const Button = props => <OriginalButton marginBottom0 {...props} />;


export const DeleteConfirmation = ({ configurationId, onConfirm, onCancel, open, ...rest }) => {
  const intl = useIntl();
  const [isDeletePossible, setIsDeletePossible] = useState(false);

  const configurationQuery = Configurations.useSingleQuery({ id: configurationId, enabled: open });
  const mappingsQuery = Mappings.useListQuery({
    enabled: open,
    onSuccess: ({ mappings }) => {
      if (!mappings.some(item => item.configurationId === configurationId)) {
        setIsDeletePossible(true);
      }
    },
  });

  const confirmation = {
    label: intl.formatMessage(
      { id: 'ui-remote-storage.removingModal.title' },
      { name: configurationQuery.configuration?.name },
    ),
    message: intl.formatMessage({ id: 'ui-remote-storage.removingModal.message' }),
    footer: (
      <ModalFooter>
        <Button buttonStyle="primary" onClick={onConfirm}>
          {intl.formatMessage({ id: 'ui-remote-storage.delete' })}
        </Button>
        <Button onClick={onCancel}>
          {intl.formatMessage({ id: 'stripes-components.cancel' })}
        </Button>
      </ModalFooter>
    ),
  };

  const impossible = {
    label: intl.formatMessage({ id: 'ui-remote-storage.cannotDeleteModal.header' }),
    message: intl.formatMessage({ id: 'ui-remote-storage.cannotDeleteModal.message' }),
    footer: (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          onClick={onCancel}
        >
          {intl.formatMessage({ id: 'stripes-core.label.okay' })}
        </Button>
      </ModalFooter>
    ),
  };

  const loading = {
    ...confirmation,
    message: <LoadingCentered />,
    footer: <ModalFooter />,
  };

  const error = {
    ...impossible,
    message: intl.formatMessage({ id: 'ui-remote-storage.error' }),
  };

  const isLoading = mappingsQuery.isFetching || configurationQuery.isLoading;
  const isError = mappingsQuery.isError || configurationQuery.isError;

  const content = (isLoading && loading) || (isError && error) || (isDeletePossible && confirmation) || impossible;

  return (
    <>
      <Modal
        size="small"
        open={open}
        label={content.label}
        footer={content.footer}
        {...rest}
      >
        {content.message}
      </Modal>

    </>
  );
};

DeleteConfirmation.propTypes = {
  ...Modal.propTypes,
  configurationId: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  label: PropTypes.node, // to make in not required
  children: PropTypes.node, // to make in not required
};
