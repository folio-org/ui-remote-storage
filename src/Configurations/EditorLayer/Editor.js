import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { FORM_ERROR } from 'final-form';

import { ConfirmationModal } from '@folio/stripes/components';

import { DEMATIC_SD, CAIASOFT } from '../../const';
import { useConfirmationModal } from '../../util/useConfirmationModal';
import { TheForm } from './TheForm';

export const Editor = ({ title, isLoading, initialValues, onSubmit, onClose, ...rest }) => {
  const intl = useIntl();
  const confirmation = useConfirmationModal();

  const handleSubmit = (values) => {
    if (values.providerName !== DEMATIC_SD) {
      delete values.statusUrl;
      delete values.accessionDelay;
    }

    if (values.providerName !== CAIASOFT) {
      delete values.apiKey;
      delete values.accessionWorkflowDetails;
    }

    return confirmation
      .wait()
      .then(() => onSubmit(values))
      .catch(() => ({ [FORM_ERROR]: true })); // to make submitSucceeded: false
  };

  const modalMessage = initialValues
    ? intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.edit.message' })
    : intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.create.message' });

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
