import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { FORM_ERROR } from 'final-form';

import {
  LoadingPane,
  Layer,
  ConfirmationModal,
} from '@folio/stripes/components';

import {
  DEMATIC_SD,
  CAIASOFT,
} from '../const';
import { useConfirmationModal } from '../util/useConfirmationModal';

import { TheForm } from './TheForm';

const Editor = ({
  isLoading,
  initialValues,
  onSubmit,
  onClose,
  ...rest
}) => {
  const intl = useIntl();
  const confirmation = useConfirmationModal();

  if (isLoading) {
    return <LoadingPane />;
  }

  const handleSubmit = (values) => {
    if (values.providerName !== DEMATIC_SD) delete values.statusUrl;
    if (values.providerName !== CAIASOFT) delete values.apiKey;

    return confirmation
      .wait()
      .then(() => onSubmit(values))
      .catch(() => ({ [FORM_ERROR]: true })); // to make submitSucceeded: false
  };

  const title = initialValues
    ? intl.formatMessage(
      { id: 'ui-remote-storage.editForm.title' },
      { name: initialValues.name },
    )
    : intl.formatMessage({ id: 'ui-remote-storage.createForm.title' });

  const modalMessage = initialValues
    ? intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.edit.message' })
    : intl.formatMessage({ id: 'ui-remote-storage.confirmationModal.create.message' });

  return (
    <Layer
      isOpen
      contentLabel={title}
    >
      <TheForm
        title={title}
        initialValues={initialValues}
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
    </Layer>
  );
};

Editor.propTypes = {
  initialValues: PropTypes.object,
  values: PropTypes.object,
  providers: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default Editor;
