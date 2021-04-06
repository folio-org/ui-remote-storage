import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Pane,
  Col,
  Row,
} from '@folio/stripes/components';
import {
  FormFooter,
} from '@folio/stripes-acq-components';
import stripesFinalForm from '@folio/stripes/final-form';

import { Details } from '../Details';

const FormComponent = ({
  pristine,
  submitting,
  onClose,
  handleSubmit,
  title,
}) => {
  const intl = useIntl();

  const paneFooter = useMemo(() => (
    <FormFooter
      label={intl.formatMessage({ id: 'ui-remote-storage.saveAndClose' })}
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      onCancel={onClose}
    />
  ), [intl, handleSubmit, pristine, submitting, onClose]);

  return (
    <form style={{ height: '100vh' }}>
      <Pane
        defaultWidth="fill"
        paneTitle={title}
        footer={paneFooter}
        onClose={onClose}
        dismissible
      >
        <Row>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
          >
            <Details />
          </Col>
        </Row>
      </Pane>
    </form>
  );
};

FormComponent.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func.isRequired,

  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export const TheForm = stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(FormComponent);
