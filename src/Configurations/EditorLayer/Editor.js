import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { FORM_ERROR } from 'final-form';

import { ConfirmationModal } from '@folio/stripes/components';

import { useConfirmationModal } from '../../util/useConfirmationModal';
import { TheForm } from './TheForm';

export const Editor = ({ title, isLoading, initialValues, onSubmit, onClose, ...rest }) => {
  const intl = useIntl();
  const confirmation = useConfirmationModal();

  const handleSubmit = values => confirmation.wait()
    .then(() => onSubmit(values))
    .catch(() => ({ [FORM_ERROR]: true })); // to make submitSucceeded: false;

  const modalMessage = initialValues.name
    ? intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.configuration.edit.message' })
    : intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.configuration.create.message' });

  return (
    <>
      <TheForm
        title={title}
        initialValues={initialValues}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onClose={onClose}
        {...rest}
      />
      <ConfirmationModal
        id="save-confirmation-modal"
        heading={title}
        message={modalMessage}
        confirmLabel={<FormattedMessage id="ui-remote-storage.confirmationModal.save" />}
        {...confirmation.props}
      />
    </>
  );
};

Editor.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  values: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};
