import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Button as OriginalButton,
  Modal,
  ModalFooter,
} from '@folio/stripes/components';

import { LoadingCentered, ErrorCentered } from '../../components';


const Button = props => <OriginalButton marginBottom0 {...props} />;


export const UI = ({
  configuration,
  isLoading,
  isError,
  isDeletePossible,
  onConfirm,
  onCancel,
  ...rest
}) => {
  const intl = useIntl();

  const confirmation = {
    label: intl.formatMessage(
      { id: 'ui-remote-storage.removingModal.title' },
      { name: configuration?.name ?? '' },
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
        <Button buttonStyle="primary" onClick={onCancel}>
          {intl.formatMessage({ id: 'stripes-core.label.okay' })}
        </Button>
      </ModalFooter>
    ),
  };

  const loading = {
    ...confirmation,
    message: <LoadingCentered size="large" />,
    footer: <ModalFooter />,
  };

  const error = {
    ...impossible,
    message: <ErrorCentered />,
  };

  const content = (isLoading && loading) || (isError && error) || (isDeletePossible && confirmation) || impossible;

  return (
    <Modal
      size="small"
      label={content.label}
      footer={content.footer}
      {...rest}
    >
      {content.message}
    </Modal>
  );
};

UI.propTypes = {
  ...Modal.propTypes,
  configuration: PropTypes.object,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isDeletePossible: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,

  label: PropTypes.node, // to make in not required
  children: PropTypes.node, // to make in not required
};
